<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductPhotoCollection extends ResourceCollection
{
    private $product;

    public function __construct($resource, Product $product) {
        $this->product = $product;
        parent::__construct($resource);
    }
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'product' => new ProductResource($this->product),
            'photos' => $this->collection->map(function($photo){
                return new ProductPhotoResource($photo, true);
            })
        ];
    }
}
