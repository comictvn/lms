<?php

namespace App\Http\Controllers\Auth\Traits;

use Nyholm\Psr7\Response as Psr7Response;

trait AuthenticateHelper
{
    public function attempt($request, $credentials)
    {
        if ($credentials['grant_type'] == 'password') {
            $credentials['username'] = $credentials['email'];
            $request = $request->withParsedBody($credentials);
        }

        return $this->withErrorHandling(function () use ($request) {
            return $this->convertResponse(
                $this->server->respondToAccessTokenRequest($request, new Psr7Response)
            );
        });
    }
}
