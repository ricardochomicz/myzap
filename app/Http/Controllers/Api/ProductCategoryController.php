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
        $changed = $product->categories()->sync($request->categories);
        //retorna array com as categorias incluidas no relacionamento
        $categoriesAttachedId = $changed['attached'];
        //consulta todos os ids das categorias que estão no array
        /** @var Collection $categories */
        $categories = Category::whereIn('id', $categoriesAttachedId)->get();
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
        //remove relacionamento
        $product->categories()->detach($category->id);
        return response()->json([], 204);
    }
}
