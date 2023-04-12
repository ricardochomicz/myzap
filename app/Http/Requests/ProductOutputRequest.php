<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\Rules\HasStock;
use Illuminate\Foundation\Http\FormRequest;

class ProductOutputRequest extends FormRequest
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
        $product = Product::findOrFail($this->product_id);
        return [
            'amount' => ['required','integer','min:1', new HasStock($product)], 
        ];
    }
}
