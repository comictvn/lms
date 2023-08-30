<?php

namespace App\Models;

use App\Models\Traits\Auth\HasAttemptLocked;
use App\Models\Traits\Auth\HasAuthenticatable;
use App\Models\Traits\Auth\HasLoginSuccessTrace;
use App\Models\Traits\FilterQueryBuilder;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens , HasLoginSuccessTrace, HasAttemptLocked, HasAuthenticatable;
    use FilterQueryBuilder;

    protected $table = 'users';

    protected $fillable = [
        'failed_attempts',
        'encrypted_password',
        'email',
        'reset_password_token',
        'reset_password_sent_at',
        'remember_created_at',
        'current_sign_in_at',
        'last_sign_in_at',
        'current_sign_in_ip',
        'last_sign_in_ip',
        'sign_in_count',
        'password',
        'password_confirmation',
        'locked_at',
        'unlock_token',
        'confirmation_token',
        'unconfirmed_email',
        'confirmed_at',
        'confirmation_sent_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'encrypted_password',
        'password',
        'password_confirmation',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'reset_password_sent_at' => 'datetime',
        'remember_created_at' => 'datetime',
        'current_sign_in_at' => 'datetime',
        'last_sign_in_at' => 'datetime',
        'locked_at' => 'datetime',
        'confirmed_at' => 'datetime',
        'confirmation_sent_at' => 'datetime',
    ];
}
