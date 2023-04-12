<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductPhotoRequest;
use App\Http\Resources\ProductPhotoCollection;
use App\Http\Resources\ProductPhotoResource;
use App\Models\Product;
use App\Models\ProductPhoto;
use Illuminate\Http\Request;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos, $product);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductPhotoRequest $request, Product $product)
    {
        $photos = ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
        return new ProductPhotoCollection($photos, $product);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductPhoto  $productPhoto
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product, ProductPhoto $photo)
    {
        $this->hasProductPhoto($photo, $product);
        return new ProductPhotoResource($photo);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductPhoto  $productPhoto
     * @return \Illuminate\Http\Response
     */
    public function update(ProductPhotoRequest $request, Product $product, ProductPhoto $photo)
    {
        $this->hasProductPhoto($photo, $product);
        $ph = $photo->uploadWithPhoto($request->photo);
        return new ProductPhotoResource($ph);

    }

    
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductPhoto  $photo
     * @param  \App\Models\Product $product
     */
    public function destroy(Product $product, ProductPhoto $photo)
    {
        $this->hasProductPhoto($photo, $product);
        $photo->deleteWithPhoto($product, $photo);
        return response()->json([], 204);
    }
    
    private function hasProductPhoto(ProductPhoto $photo, Product $product)
    {
        if ($photo->product_id != $product->id) {
            abort(404);
        }
    }

   
}
