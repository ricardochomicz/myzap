<?php

namespace App\Providers;

use App\Common\OnlyTrashed;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    use OnlyTrashed;
    /**
     * The path to the "home" route for your application.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });

        Route::bind('category', function ($value) {
            $collection = Category::whereId($value)->orWhere('slug', $value)->get();
            return $collection->first();
        });

        Route::bind('product', function ($value) {
            $query = Product::query();
            $request = app(Request::class);
            $query = $this->onlyTrashedIfRequest($request, $query);
            $collection = $query->whereId($value)->orWhere('slug', $value)->get();
            return $collection->first();
        });

        Route::bind('user', function ($value) {
            $query = User::query();
            $request = app(Request::class);
            $query = $this->onlyTrashedIfRequest($request, $query);
            return $query->find($value);
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
