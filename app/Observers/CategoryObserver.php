<?php

namespace App\Observers;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryObserver
{
    public function creating(Category $category)
    {
        $category->slug = Str::kebab($category->name);
    }

    public function updating(Category $category)
    {
        $category->slug = Str::kebab($category->name);
    }
}
