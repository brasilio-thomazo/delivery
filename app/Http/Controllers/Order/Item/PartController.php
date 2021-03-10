<?php

namespace App\Http\Controllers\Order\Item;

use App\Http\Controllers\Controller;
use App\Models\OrderItemPart;
use Illuminate\Http\Request;

class PartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OrderItemPart  $orderItemPart
     * @return \Illuminate\Http\Response
     */
    public function show(OrderItemPart $orderItemPart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OrderItemPart  $orderItemPart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OrderItemPart $orderItemPart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OrderItemPart  $orderItemPart
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrderItemPart $orderItemPart)
    {
        //
    }
}
