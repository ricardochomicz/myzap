<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|max:255|email|unique:users,email,' . $this->user->id,
            'password' => 'required|min:6|max:16'
        ];

        if ($this->method() == 'PUT') {
            $rules['password'] = 'nullable|min:6|max:16';
        }

        return $rules;
    }
}
