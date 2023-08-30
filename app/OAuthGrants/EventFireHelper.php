<?php

namespace App\OAuthGrants;

use App\Events\Auth\AttemptLock;
use App\Events\Auth\VerifyEmailFailed;
use Illuminate\Auth\Events\Attempting;
use Illuminate\Auth\Events\Authenticated;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Validated;
use Illuminate\Auth\Events\Verified;

trait EventFireHelper
{
    public function fireAttemptingEvent($guard, $credentials)
    {
        event(new Attempting($guard, $credentials, false));
    }

    public function fireAttemptLockEvent($guard, $user)
    {
        event(new AttemptLock($guard, $user));
    }

    public function fireValidatedEvent($guard, $user)
    {
        event(new Validated($guard, $user));
    }

    public function fireFailedEvent($guard, $user, $credentials)
    {
        event(new Failed($guard, $user, $credentials));
    }

    public function fireLoginEvent($guard, $user)
    {
        event(new Login($guard, $user, false));
    }

    public function fireAuthenticatedEvent($guard, $user)
    {
        event(new Authenticated($guard, $user));
    }

    public function fireVerifiedEvent($user)
    {
        $user->markEmailAsVerified();
        event(new Verified($user));
    }

    public function fireVerifyEmailFailedEvent($guard, $user, $credentials)
    {
        event(new VerifyEmailFailed($guard, $user, $credentials));
    }
}
