<?php

use App\Http\Controllers\Api\{
    CategoryController,
    ProductController,
    ProductCategoryController,
    ProductInputController,
    ProductOutputController,
    ProductPhotoController
};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['as' => 'api.'], function () {
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('products.categories', ProductCategoryController::class, ['only' => ['index', 'store', 'destroy']]);
    Route::resource('products.photos', ProductPhotoController::class, ['except' => ['create', 'edit']]);
    Route::resource('inputs', ProductInputController::class, ['only' => ['index', 'store', 'show']]);
    Route::resource('outputs', ProductOutputController::class, ['only' => ['index', 'store', 'show']]);
});

