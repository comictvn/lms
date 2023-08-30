<?php

namespace App\Models\Traits\Auth;

trait HasLoginSuccessTrace
{
    public function loginSuccess(): void
    {
        $this->increment('sign_in_count');
        $this->forceFill([
            'current_sign_in_at' => now(),
            'last_sign_in_at' => now(),
            'last_sign_in_ip' => request()->getClientIp(),
        ])->save();
    }
}
