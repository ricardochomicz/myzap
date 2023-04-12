<?php

namespace App\Observers;

use App\Models\ProductInput;

class ProductInputObserver
{
    public function creating(ProductInput $input)
    {
        $product = $input->product;
        $product->stock += $input->amount;
        $product->save();
    }
}
