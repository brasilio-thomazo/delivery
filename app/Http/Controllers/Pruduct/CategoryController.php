<?php

namespace App\Http\Controllers\Pruduct;

use App\Http\Controllers\Controller;
use App\Models\Product\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Category::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(['name' => 'required|unique:product_categories']);
        $category = new Category($request->only('name'));
        $category->save();
        return response($category);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        if ($category->name != $request->name) {
            $request->validate(['name' => 'required|unique:product_categories']);
            $category->update($request->only(('name')));
        }
        return response($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
