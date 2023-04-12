<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductOutputRequest;
use App\Http\Resources\ProductOutputResource;
use App\Models\ProductOutput;
use Illuminate\Http\Request;

class ProductOutputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $outputs = ProductOutput::with('product')->paginate();
        return ProductOutputResource::collection($outputs);
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductOutputRequest $request)
    {
        $output = ProductOutput::create($request->all());
        return new ProductOutputResource($output);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductOutput  $productOutput
     * @return \Illuminate\Http\Response
     */
    public function show(ProductOutput $output)
    {
        return new ProductOutputResource($output);
    }

}
