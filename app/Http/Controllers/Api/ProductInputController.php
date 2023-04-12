<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductInputRequest;
use App\Http\Requests\ProductOutputRequest;
use App\Http\Resources\ProductInputResource;
use App\Models\ProductInput;
use Illuminate\Http\Request;

class ProductInputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inputs = ProductInput::with('product')->paginate();
        return ProductInputResource::collection($inputs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductOutputRequest $request)
    {
        $input = ProductInput::create($request->all());
        return new ProductInputResource($input);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductInput  $productInput
     * @return \Illuminate\Http\Response
     */
    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }

}
