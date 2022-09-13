<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'active'];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function scopeFilter($query, $params)
    {
        return $query->where(function ($query) use ($params) {
            $query->where('name', 'LIKE', "%{$params}%")
                ->orWhere('active', $params);
        });
    }
}
