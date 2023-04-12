<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'products';

    protected $fillable = ['name', 'price', 'slug', 'description', 'stock'];

    public function scopeFilter($query, $params)
    {
        return $query->where(function ($query) use ($params) {
            $query->where('name', 'LIKE', "%{$params}%")
                ->orWhere('deleted_at', $params);
        });
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function photos()
    {
        return $this->hasMany(ProductPhoto::class);
    }
}
