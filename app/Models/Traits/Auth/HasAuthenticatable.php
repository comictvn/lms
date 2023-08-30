<?php

namespace App\Models\Traits\Auth;

use App\Notifications\Auth\ResetPasswordNotification;
use App\Notifications\Auth\VerifyEmailNotification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

trait HasAuthenticatable
{
    public function getAuthPassword(): string
    {
        return $this->encrypted_password;
    }

    public function hasVerifiedEmail(): bool
    {
        $isEnableVerification = config('auth.verification.'.$this->getTable().'.enable');

        return ! $isEnableVerification || ! is_null($this->confirmed_at);
    }

    public function markEmailAsVerified(): bool
    {
        return $this->forceFill([
            'confirmed_at' => now(),
            'confirmation_token' => null,
            'confirmation_sent_at' => null,
        ])->save();
    }

    public function sendEmailVerificationNotification(): void
    {
        $this->forceFill([
            'confirmation_token' => Hash::make(Str::random(8)),
            'confirmation_sent_at' => now(),
        ])->save();

        $this->notify(new VerifyEmailNotification());
    }

    public function sendPasswordResetNotification($token = ''): void
    {
        $token = Hash::make(Str::random(8));

        $this->forceFill([
            'reset_password_token' => $token,
            'reset_password_sent_at' => now(),
        ])->save();

        $this->notify(new ResetPasswordNotification($token));
    }

    public function verifyEmail(string $confirmation_token)
    {
        return $this->where('confirmation_token', $confirmation_token)->first();
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if ($user->password) {
                $user->encrypted_password = Hash::make($user->password);
                $user->password = null;
                $user->password_confirmation = null;
            }
        });

        static::updating(function ($user) {
            if ($user->password) {
                $user->encrypted_password = Hash::make($user->password);
                $user->password = null;
                $user->password_confirmation = null;
            }
        });
    }
}
