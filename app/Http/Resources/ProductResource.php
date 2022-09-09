<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => $this->price,
            'description' => $this->description,
            'stock' => $this->stock,
            'active' => $this->active,
            'created_at' => \Carbon\Carbon::parse($this->created_at)->format('d/m/Y'),
            'updated_at' => $this->updated_at->diffForHumans()
        ];
    }
}
