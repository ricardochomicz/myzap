<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductInput extends Model
{
    use HasFactory;

    protected $fillable = ['amount', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeFilter($query, $params)
    {
        return $query->whereHas('product', function ($query) use ($params) {
            $query->where('name', 'LIKE', "%{$params}%");
        });

        // return $query->product()->where(function ($query) use ($params) {
        //     $query->where('name', 'LIKE', "%{$params}%");
        // });
    }
}
