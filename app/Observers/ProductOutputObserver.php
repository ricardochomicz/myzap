<?php

namespace App\Observers;

use App\Models\ProductOutput;

class ProductOutputObserver
{
    public function creating(ProductOutput $output)
    {
        $product = $output->product;
        $product->stock -= $output->amount;
        $product->save();
    }
}
