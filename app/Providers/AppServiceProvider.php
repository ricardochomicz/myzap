<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Product;
use App\Observers\CategoryObserver;
use App\Observers\ProductObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Category::observe(CategoryObserver::class);
        Product::observe(ProductObserver::class);
    }
}
