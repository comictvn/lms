<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RevokeTokenRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'token' => 'required',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
