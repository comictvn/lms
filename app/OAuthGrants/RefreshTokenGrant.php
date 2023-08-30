<?php

namespace App\OAuthGrants;

use DateInterval;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\Grant\RefreshTokenGrant as BaseRefreshTokenGrant;
use League\OAuth2\Server\RequestAccessTokenEvent;
use League\OAuth2\Server\RequestEvent;
use League\OAuth2\Server\RequestRefreshTokenEvent;
use League\OAuth2\Server\ResponseTypes\ResponseTypeInterface;
use Psr\Http\Message\ServerRequestInterface;

class RefreshTokenGrant extends BaseRefreshTokenGrant
{
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
            $client->provider = $this->getRequestParameter('scope', $request);
            $oldRefreshToken = $this->validateOldRefreshToken($request, $client->getIdentifier());
            $scopes = $this->validateScopes(
                $this->getRequestParameter(
                    'scope',
                    $request,
                    \implode(self::SCOPE_DELIMITER_STRING, $oldRefreshToken['scopes'])
                )
            );

            // The OAuth spec says that a refreshed access token can have the original scopes or fewer so ensure
            // the request doesn't include any new scopes
            foreach ($scopes as $scope) {
                if (\in_array($scope->getIdentifier(), $oldRefreshToken['scopes'], true) === false) {
                    throw OAuthServerException::invalidScope($scope->getIdentifier());
                }
            }

            // Expire old tokens
            $this->accessTokenRepository->revokeAccessToken($oldRefreshToken['access_token_id']);
            if ($this->revokeRefreshTokens) {
                $this->refreshTokenRepository->revokeRefreshToken($oldRefreshToken['refresh_token_id']);
            }

            // Issue and persist new access token
            $accessToken = $this->issueAccessToken($accessTokenTTL, $client, $oldRefreshToken['user_id'], $scopes);
            $this->getEmitter()->emit(new RequestAccessTokenEvent(RequestEvent::ACCESS_TOKEN_ISSUED, $request, $accessToken));
            $responseType->setAccessToken($accessToken);

            // Issue and persist new refresh token if given
            if ($this->revokeRefreshTokens) {
                $refreshToken = $this->issueRefreshToken($accessToken);

                if ($refreshToken !== null) {
                    $this->getEmitter()->emit(new RequestRefreshTokenEvent(RequestEvent::REFRESH_TOKEN_ISSUED, $request, $refreshToken));
                    $responseType->setRefreshToken($refreshToken);
                }
            }

            if (is_null($model = config("auth.providers.{$client->provider}.model"))) {
                throw OAuthServerException::serverError('Unable to determine user model from configuration.');
            }

            $current_user = (new $model())->find($oldRefreshToken['user_id']);
            auth($client->provider)->setUser($current_user);

            return $responseType;
        } catch (\Exception $exception) {
            abort(400, __('auth.failed'));
        }
    }
}
