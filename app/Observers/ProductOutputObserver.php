<?php

namespace App\Observers;

use App\Models\ProductOutput;

class ProductOutputObserver
{
    public function creating(ProductOutput $output)
    {
        $product = $output->product;
        $product->stock -= $output->amount;
        if ($product->stock < 0) {
            throw new \Exception("Estoque de {$product->name} não pode ser negativo!");
        }
        $product->save();
    }
}
