<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Response::json(Product::with(['type', 'category'])->get(), 201, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rule = Rule::unique('products');
        $rule = $rule->where('id_type', $request->id_type);
        $rule = $rule->where('id_category', $request->id_category);
        $fields = ['name', 'id_type', 'id_category', 'description', 'cost', 'price'];

        $validate = [
            'name'        => ['required', 'min:3', $rule],
            'id_type'     => ['required', 'numeric', 'gt:0'],
            'id_category' => ['required', 'numeric', 'gt:0'],
            'cost'        => ['required', 'numeric', 'gt:0'],
            'price'       => ['required', 'numeric', 'gt:0'],
        ];

        $request->validate($validate);
        $product = new Product($request->only($fields));
        $product->save();
        return Response::json(Product::with(['type', 'category'])->find($product->id), 201, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return Response::json(Product::with(['type', 'category'])->find($product->id), 201, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
        return Response::json(Product::with(['type', 'category'])->find($product->id), 201, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
