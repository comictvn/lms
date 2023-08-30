<?php

namespace App\Models\Traits\Auth;

use App\Notifications\Auth\UnlockEmailNotification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

trait HasAttemptLocked
{
    public function loginFailed(): void
    {
        if ($this->isLocked()) {
            return;
        }
        $this->increaseFailedAttempt();

        if ($this->isMaxFailedAttempts()) {
            $this->lock();
        }
    }

    public function increaseFailedAttempt(): void
    {
        $this->increment('failed_attempts');
    }

    public function isMaxFailedAttempts(): bool
    {
        $maxAttempts = config('auth.limiter.'.$this->getTable().'.max_attempts');

        return $this->failed_attempts >= $maxAttempts;
    }

    public function isLocked(): bool
    {
        if (is_null($this->locked_at)) {
            return false;
        }

        $unlockStrategy = config('auth.limiter.'.$this->getTable().'.unlock_strategy');

        if ($unlockStrategy == 'email') {
            return true;
        }

        $unlockIn = config('auth.limiter.'.$this->getTable().'.unlock_in');

        $timeUnlock = $this->locked_at->addMinutes($unlockIn);

        return now()->isBefore($timeUnlock);
    }

    public function lock(): void
    {
        $isUnlockByEmail = in_array(
            config('auth.limiter.'.$this->getTable().'.unlock_strategy'),
            ['email', 'both']
        );

        if (! $isUnlockByEmail) {
            $this->forceFill(['locked_at' => now()])->save();

            return;
        }

        $token = Hash::make(Str::random(8));

        $this->forceFill([
            'locked_at' => now(),
            'unlock_token' => $token,
        ])->save();

        $this->notify(new UnlockEmailNotification($token));
    }

    public function releaseLock(): void
    {
        $this->forceFill([
            'locked_at' => null,
            'unlock_token' => null,
            'failed_attempts' => 0,
        ])->save();
    }
}
