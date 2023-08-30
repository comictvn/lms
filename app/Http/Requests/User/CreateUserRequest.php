<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'users.email' => 'required|string|email|max:255|min:0|unique:users,email',
        ];
    }

    protected function passedValidation()
    {
        $this->replace([
            'email' => $this->string('users.email'),
        ]);
    }
}
