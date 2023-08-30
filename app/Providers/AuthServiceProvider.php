<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        \Laravel\Passport\Passport::tokensExpireIn(now()->addMinutes(config('session.lifetime')));
        \Laravel\Passport\Passport::tokensCan([
            'users' => 'users',
        ]);
    }

    public function register()
    {
        $this->extendAuthorizationServer();
        \Laravel\Passport\Passport::ignoreRoutes();
    }

    /**
     * @return \App\OAuthGrants\VerifiedEmailGrant
     *
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    protected function makeVerifiedEmailRequestGrant()
    {
        $grant = new \App\OAuthGrants\VerifiedEmailGrant(
            $this->app->make(\Laravel\Passport\Bridge\UserRepository::class),
            $this->app->make(\Laravel\Passport\Bridge\RefreshTokenRepository::class)
        );
        $grant->setRefreshTokenTTL(\Laravel\Passport\Passport::refreshTokensExpireIn());

        return $grant;
    }

    /**
     * Register the Grants.
     *
     * @return void
     */
    protected function extendAuthorizationServer()
    {
        $this->app->extend(\League\OAuth2\Server\AuthorizationServer::class, function ($server) {
            return tap($server, function ($server) {
                $server->enableGrantType(
                    $this->makeVerifiedEmailRequestGrant(),
                    \Laravel\Passport\Passport::tokensExpireIn()
                );
            });
        });
    }
}
