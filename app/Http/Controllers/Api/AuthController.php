<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\UnlockRequest;
use App\Http\Requests\Auth\UserEmailRegistrationRequest;
use App\Http\Requests\Auth\VerifyEmailRequest;
use App\Http\Requests\Auth\VerifyResetPasswordRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function userResetPassword(ResetPasswordRequest $request)
    {
        return $this->authService->resetPassword($request->validated(), 'users');
    }

    public function userVerifyResetPassword(VerifyResetPasswordRequest $request)
    {
        return $this->authService->verifyResetPassword($request->validated(), 'users');
    }

    public function userEmailRegistration(UserEmailRegistrationRequest $request)
    {
        return $this->authService->userEmailRegistration($request->validated());
    }

    public function userChangePassword(ChangePasswordRequest $request)
    {
        return $this->authService->changePassword($request->validated(), 'users');
    }

    public function userVerifyEmail(VerifyEmailRequest $request)
    {
        return $this->authService->verifyEmail($request->validated(), 'users');
    }

    public function userUnlock(UnlockRequest $request)
    {
        return $this->authService->unlock($request->validated(), 'users');
    }
}
