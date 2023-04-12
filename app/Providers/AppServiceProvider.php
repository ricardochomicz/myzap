<?php

namespace App\Providers;

use App\Models\Product;
use App\Models\ProductInput;
use App\Models\ProductOutput;
use App\Observers\ProductInputObserver;
use App\Observers\ProductObserver;
use App\Observers\ProductOutputObserver;
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
        Product::observe(ProductObserver::class);
        ProductInput::observe(ProductInputObserver::class);
        ProductOutput::observe(ProductOutputObserver::class);
    }
}
