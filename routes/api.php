<?php

use App\Http\Controllers\Api\{
    AuthController,
    CategoryController,
    ProductCategoryController,
    ProductController,
    ProductInputController,
    ProductOutputController,
    ProductPhotoController,
    UserController
};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'api.'], function () {
    Route::name('register')->post('register', [AuthController::class, 'register']);
    Route::name('login')->post('login', [AuthController::class, 'login']);
    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::resource('categories', CategoryController::class, ['except' => ['edit', 'create']]);
        Route::patch('products/{product}/restore', [ProductController::class, 'restore']);
        Route::resource('products', ProductController::class, ['except' => ['edit', 'create']]);
        Route::resource('product.categories', ProductCategoryController::class, ['only' => ['index', 'store', 'destroy']]);
        Route::resource('products.photos', ProductPhotoController::class, ['except' => ['create', 'edit']]);
        Route::resource('inputs', ProductInputController::class, ['only' => ['index', 'store', 'show']]);
        Route::resource('outputs', ProductOutputController::class, ['only' => ['index', 'store', 'show']]);
        Route::resource('users', UserController::class, ['except' => ['edit', 'create']]);
    });
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
