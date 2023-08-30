<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Auth\Traits\AuthenticateHelper;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Passport\Http\Controllers\AccessTokenController as IssueTokenController;
use Laravel\Passport\Passport;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class AccessTokenController extends IssueTokenController
{
    use AuthenticateHelper;

    /**
     * Authorize a client to access the user's account.
     *
     * @lrd:start
     * ***Note: for using Token***
     *
     * - **client_id, client_secret and scope**  is required for all cases
     *
     * - Login method should **NOT** be including **refresh_token**
     * @lrd:end
     *
     * @LRDparam grant_type required|in:password,refresh_token
     * @LRDparam scope required|in:users
     * @LRDparam email required_with_all:scope,password|email
     * @LRDparam password required_with_all:scope,email
     * @LRDparam refresh_token required_if:grant_type,refresh_token
     * @LRDparam client_id required
     * @LRDparam client_secret required
     *
     * @return Response
     */
    public function issueToken(ServerRequestInterface $request)
    {
        //Validate
        $validator = Validator::make($request->getParsedBody(), [
            'grant_type' => 'required|in:password,refresh_token,verified_email_grant',
            'scope' => 'required|in:users',
            'email' => 'required_with_all:scope,password|email',
            'password' => 'required_with_all:scope,email',
            'confirmation_token' => 'required_if:grant_type,verified_email_grant',
            'refresh_token' => 'required_if:grant_type,refresh_token',
            'client_id' => 'required',
            'client_secret' => 'required',
        ]);

        $validated_data = $validator->validated();
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->all());
        }

        if ($response = $this->attempt($request, $validated_data)) {
            $response_data = json_decode($response->getContent(), true);
            $response_data['scope'] = $validated_data['scope'];
            $response_data['resource_owner'] = $validated_data['scope'];
            $response_data['resource_id'] = auth($validated_data['scope'])->id();
            $response_data['created_at'] = now();
            $response_data['refresh_token_expires_in'] = now()->add(Passport::refreshTokensExpireIn())->diffInSeconds();

            return $response_data;
        }

        throw new UnauthorizedHttpException('', __('auth.failed'));
    }
}
