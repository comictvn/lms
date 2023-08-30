<?php

namespace App\Guards;

class TokenGuard extends \Laravel\Passport\Guards\TokenGuard
{
    /**
     * Authenticate the incoming request via the Bearer token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    protected function authenticateViaBearerToken($request)
    {
        if (! $psr = $this->getPsrRequestViaBearerToken($request)) {
            return;
        }

        $client = $this->clients->findActive(
            $psr->getAttribute('oauth_client_id')
        );

        $client->provider = $this->provider->getProviderName();

        // If the access token is valid we will retrieve the user according to the user ID
        // associated with the token. We will use the provider implementation which may
        // be used to retrieve users from Eloquent. Next, we'll be ready to continue.
        $user = $this->provider->retrieveById(
            $psr->getAttribute('oauth_user_id') ?: null
        );

        if (! $user) {
            return;
        }

        // Next, we will assign a token instance to this user which the developers may use
        // to determine if the token has a given scope, etc. This will be useful during
        // authorization such as within the developer's Laravel model policy classes.
        $token = $this->tokens->find(
            $psr->getAttribute('oauth_access_token_id')
        );

        if (! in_array($this->provider->getProviderName(), $token->scopes)) {
            return;
        }

        return $token ? $user->withAccessToken($token) : null;
    }
}
