<?php

namespace App\OAuthGrants;

use DateInterval;
use Exception;
use Laravel\Passport\Bridge\User;
use League\OAuth2\Server\Entities\UserEntityInterface;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\Grant\AbstractGrant;
use League\OAuth2\Server\Repositories\RefreshTokenRepositoryInterface;
use League\OAuth2\Server\Repositories\UserRepositoryInterface;
use League\OAuth2\Server\RequestAccessTokenEvent;
use League\OAuth2\Server\RequestEvent;
use League\OAuth2\Server\RequestRefreshTokenEvent;
use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
use Psr\Http\Message\ServerRequestInterface;

class VerifiedEmailGrant extends AbstractGrant
{
    use EventFireHelper;

    public function __construct(UserRepositoryInterface $userRepository, RefreshTokenRepositoryInterface $refreshTokenRepository)
    {
        $this->setUserRepository($userRepository);
        $this->setRefreshTokenRepository($refreshTokenRepository);
        $this->refreshTokenTTL = new DateInterval('P1M');
    }

    /**
     * {@inheritdoc}
     */
    public function respondToAccessTokenRequest(ServerRequestInterface $request, ResponseTypeInterface $responseType, DateInterval $accessTokenTTL)
    {
        try {
            // Validate request
            $client = $this->validateClient($request);

            $scopes = $this->validateScopes($this->getRequestParameter('scope', $request, $this->defaultScope));
            $client->provider = $this->getRequestParameter('scope', $request);
            $user = $this->validateUser($request, $client->provider);

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
        } catch (Exception $exception) {
            abort(400, __('auth.failed'));
        }
    }

    /**
     * @return UserEntityInterface
     *
     * @throws OAuthServerException
     */
    protected function validateUser(ServerRequestInterface $request, string $provider)
    {
        $user = $this->getUserEntityByRequest($provider, $request->getParsedBody());
        if (false === $user instanceof UserEntityInterface) {
            $this->getEmitter()->emit(new RequestEvent(RequestEvent::USER_AUTHENTICATION_FAILED, $request));

            abort(400, __('auth.failed'));
        }

        return $user;
    }

    /**
     * Retrieve user by request.
     *
     * @return null|User
     *
     * @throws OAuthServerException
     */
    protected function getUserEntityByRequest($provider, $request)
    {
        if (is_null($email_provider = config("auth.methods.email.$provider.provider"))) {
            throw OAuthServerException::serverError('Unable to determine user model from configuration.');
        }
        if (is_null($model = config("auth.providers.$email_provider.model"))) {
            throw OAuthServerException::serverError('Unable to determine user model from configuration.');
        }

        $user = (new $model())->verifyEmail($request['confirmation_token']);
        if ($user) {
            if (! $this->verifyConfirmationTokenExpired($user)) {
                $this->fireVerifyEmailFailedEvent($provider, $user, ['confirmation_token' => $request['confirmation_token']]);

                return null;
            }
            $this->fireVerifiedEvent($user);
            $this->fireLoginEvent($provider, $user);
            $this->fireAuthenticatedEvent($provider, $user);

            auth($provider)->setUser($user);

            return new User($user->getAuthIdentifier());
        }

        return null;
    }

    protected function verifyConfirmationTokenExpired($model)
    {
        $tokenExpireTime = $model->confirmation_sent_at
            ->addMinutes(config("auth.verification.{$model->getTable()}.expire", 30));

        return ! now()->isAfter($tokenExpireTime);
    }

    /**
     * {@inheritdoc}
     */
    public function getIdentifier()
    {
        return 'verified_email_grant';
    }
}
