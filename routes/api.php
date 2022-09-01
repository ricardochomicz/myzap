<?php

use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['as' => 'api.'], function(){
    Route::resource('categories', CategoryController::class,['except' => ['edit', 'create']]);
    
    });


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


