<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCategoryRequest;
use App\Http\Resources\ProductCategoryResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Product $product)
    {
        return new ProductCategoryResource($product);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductCategoryRequest $request, Product $product)
    {
        //sincroniza as categories conforme array do    request
        $result = $product->categories()->sync($request->categories);
        //pega todos os ids inseridos
        $categoryAttachedId = $result['attached'];
        //consulta todas as categorias presentes no array
        $categories = Category::whereIn('id', $categoryAttachedId)->get();
        return $categories->count() ? response()->json(new ProductCategoryResource($product), 201) : [];
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product, Category $category)
    {
        //remove o relacionamento product x category
        $product->categories()->detach($category->id);
        return response()->json([], 204);
    }
}
