<?php

namespace App\OAuthGrants;

use DateInterval;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\Bridge\User;
use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Entities\UserEntityInterface;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\Grant\PasswordGrant;
use League\OAuth2\Server\RequestAccessTokenEvent;
use League\OAuth2\Server\RequestEvent;
use League\OAuth2\Server\RequestRefreshTokenEvent;
use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;

class MultipleAuthPasswordGrant extends PasswordGrant
{
    use EventFireHelper;

    /**
     * {@inheritdoc}
     */
    public function respondToAccessTokenRequest(
        ServerRequestInterface $request,
        ResponseTypeInterface $responseType,
        DateInterval $accessTokenTTL
    ) {
        try {
            // Validate request
            $client = $this->validateClient($request);

            $scopes = $this->validateScopes($this->getRequestParameter('scope', $request, $this->defaultScope));
            $client->provider = $this->getRequestParameter('scope', $request);
            $user = $this->validateUser($request, $client);

            // Finalize the requested scopes
            $finalizedScopes = $this->scopeRepository->finalizeScopes($scopes, $this->getIdentifier(), $client, $user->getIdentifier());

            // Issue and persist new access token
            $accessToken = $this->issueAccessToken($accessTokenTTL, $client, $user->getIdentifier(), $finalizedScopes);
            $this->getEmitter()->emit(new RequestAccessTokenEvent(RequestEvent::ACCESS_TOKEN_ISSUED, $request, $accessToken));
            $responseType->setAccessToken($accessToken);

            // Issue and persist new refresh token if given
            $refreshToken = $this->issueRefreshToken($accessToken);

            if ($refreshToken !== null) {
                $this->getEmitter()->emit(new RequestRefreshTokenEvent(RequestEvent::REFRESH_TOKEN_ISSUED, $request, $refreshToken));
                $responseType->setRefreshToken($refreshToken);
            }

            return $responseType;
        } catch (\Exception $exception) {
            abort(400, __('auth.failed'));
        }
    }

    /**
     * {@inheritdoc}
     */
    protected function validateUser(ServerRequestInterface $request, ClientEntityInterface $client)
    {
        $username = $this->getRequestParameter('username', $request);

        if (! is_string($username)) {
            throw OAuthServerException::invalidRequest('username');
        }

        $password = $this->getRequestParameter('password', $request);

        if (! is_string($password)) {
            throw OAuthServerException::invalidRequest('password');
        }

        $user = $this->getUserEntityByUserCredentials(
            $username,
            $password,
            $client
        );

        if ($user instanceof UserEntityInterface === false) {
            $this->getEmitter()->emit(new RequestEvent(RequestEvent::USER_AUTHENTICATION_FAILED, $request));

            abort(422, __('auth.failed'));
        }

        return $user;
    }

    public function getUserEntityByUserCredentials($username, $password, ClientEntityInterface $clientEntity)
    {
        $provider = $clientEntity->provider ?: config('auth.guards.api.provider');
        $credentials = ['email' => $username, 'password' => $password];
        $this->fireAttemptingEvent($provider, $credentials);

        if (is_null($email_provider = config("auth.methods.email.$provider.provider"))) {
            throw new RuntimeException('Unable to determine user model from configuration.');
        }

        if (is_null($model = config('auth.providers.'.$email_provider.'.model'))) {
            throw new RuntimeException('Unable to determine authentication model from configuration.');
        }

        if (method_exists($model, 'findAndValidateForPassport')) {
            $user = (new $model)->findAndValidateForPassport($username, $password);

            if (! $user) {
                $this->fireFailedEvent($provider, $user, $credentials);

                return null;
            }
            $this->fireAttemptLockEvent($provider, $user);
            $this->fireValidatedEvent($provider, $user);
            $this->fireLoginEvent($provider, $user);
            $this->fireAuthenticatedEvent($provider, $user);

            return new User($user->getAuthIdentifier());
        }

        if (method_exists($model, 'findForPassport')) {
            $user = (new $model)->findForPassport($username);
        } else {
            $user = (new $model)->where('email', $username)->first();
        }

        if (! $user) {
            $this->fireFailedEvent($provider, $user, $credentials);

            return null;
        }

        $this->fireAttemptLockEvent($provider, $user);

        if (method_exists($user, 'validateForPassportPasswordGrant')) {
            if (! $user->validateForPassportPasswordGrant($password)) {
                $this->fireFailedEvent($provider, $user, $credentials);

                return null;
            }
        }

        if (! Hash::check($password, $user->getAuthPassword())) {
            $this->fireFailedEvent($provider, $user, $credentials);

            return null;
        }

        $current_user = (new $model())->find($user->getAuthIdentifier());
        auth($provider)->setUser($current_user);

        $this->fireValidatedEvent($provider, $user);
        $this->fireLoginEvent($provider, $user);
        $this->fireAuthenticatedEvent($provider, $user);

        return new User($user->getAuthIdentifier());
    }
}
