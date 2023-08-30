<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RevokeTokenRequest;

class RevokeTokenController extends Controller
{
    public function revoke(RevokeTokenRequest $request)
    {
        $request->user()->token()->revoke();
        $refreshTokenRepository = app('Laravel\Passport\RefreshTokenRepository');
        $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($request->user()->token()->id);

        return response()->json(['success' => true]);
    }
}
