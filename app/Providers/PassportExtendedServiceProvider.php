<?php

namespace App\Providers;

use App\Guards\TokenGuard;
use App\OAuthGrants\MultipleAuthPasswordGrant;
use App\OAuthGrants\RefreshTokenGrant;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Bridge\RefreshTokenRepository;
use Laravel\Passport\Bridge\UserRepository;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\Passport;
use Laravel\Passport\PassportServiceProvider;
use Laravel\Passport\PassportUserProvider;
use Laravel\Passport\TokenRepository;
use League\OAuth2\Server\ResourceServer;

class PassportExtendedServiceProvider extends PassportServiceProvider
{
    /**
     * Create and configure a Password grant instance.
     *
     * @return MultipleAuthPasswordGrant
     */
    protected function makePasswordGrant()
    {
        $grant = new MultipleAuthPasswordGrant(
            $this->app->make(UserRepository::class),
            $this->app->make(RefreshTokenRepository::class)
        );

        $grant->setRefreshTokenTTL(Passport::refreshTokensExpireIn());

        return $grant;
    }

    /**
     * Create and configure a Refresh Token grant instance.
     *
     * @return \League\OAuth2\Server\Grant\RefreshTokenGrant
     */
    protected function makeRefreshTokenGrant()
    {
        $repository = $this->app->make(RefreshTokenRepository::class);

        return tap(new RefreshTokenGrant($repository), function ($grant) {
            $grant->setRefreshTokenTTL(Passport::refreshTokensExpireIn());
        });
    }

    /**
     * Make an instance of the token guard.
     *
     * @param  array  $config
     * @return \Laravel\Passport\Guards\TokenGuard
     */
    protected function makeGuard(array $config)
    {
        return new TokenGuard(
            $this->app->make(ResourceServer::class),
            new PassportUserProvider(Auth::createUserProvider($config['provider']), $config['provider']),
            $this->app->make(TokenRepository::class),
            $this->app->make(ClientRepository::class),
            $this->app->make('encrypter'),
            $this->app->make('request')
        );
    }
}
