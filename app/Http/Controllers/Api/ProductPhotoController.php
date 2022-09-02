<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;

class ProductPhotoController extends Controller
{
    public function index(Product $product)
    {
        return $product->photos;
    }

    public function store(Request $request)
    {
    }

    public function show(Product $product, ProductPhoto $photo)
    {
        if ($photo->product_id != $product->id) {
            abort(404);
        }
        return $photo;
    }

    public function update(Request $request, ProductPhoto $productPhoto)
    {
        # code...
    }

    public function destroy(ProductPhoto $photo)
    {
        # code...
    }
}
