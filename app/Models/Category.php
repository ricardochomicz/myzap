<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'categories';

    protected $fillable = ['name'];

    public function scopeFilter($query, $params)
    {
        return $query->where(function ($query) use ($params) {
            $query->where('name', 'LIKE', "%{$params}%")
                ->orWhere('deleted_at', $params);
        });
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
