<?php

use App\Http\Controllers\Api\{
    CategoryController,
    ProductCategoryController,
    ProductController,
    ProductInputController,
    ProductOutputController
};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'api.'], function () {
    Route::resource('categories', CategoryController::class, ['except' => ['edit', 'create']]);
    Route::resource('products', ProductController::class, ['except' => ['edit', 'create']]);
    Route::resource('products.categories', ProductCategoryController::class, ['only' => ['index', 'store', 'destroy']]);
    Route::resource('inputs', ProductInputController::class, ['only' => ['index', 'store', 'show']]);
    Route::resource('outputs', ProductOutputController::class, ['only' => ['index', 'store', 'show']]);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
