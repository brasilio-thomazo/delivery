<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderItemPart;
use App\Models\Printer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Order::with(['client', 'user', 'payment', 'items'])->get();
        return Response::json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $orderData = $request->only([
            'id_user',
            'id_client',
            'id_payment',
            'price',
            'cost',
            'pay',
            'repay',
            'observation',
        ]);

        $order = new Order($orderData);
        if ($order->save()) {
            foreach ($request->items as $item) {
                $itemData = array_merge($item, ['id_order' => $order->id]);
                unset($itemData['parts']);
                $orderItem = new OrderItem($itemData);
                if (!$orderItem->save()) {
                    continue;
                }
                foreach ($item['parts'] as $part) {
                    $partData = array_merge($part, ['id_order_item' => $orderItem->id]);
                    $orderItemPart = new OrderItemPart($partData);
                    $orderItemPart->save();
                }
            }
            $printer = new Printer(['id_order' => $order->id]);
            $printer->save();
            return Response::json($printer);
        }

        return Response::json($order);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        $data = Order::with(['client', 'user', 'payment', 'items'])->find($order->id);
        return Response::json($data, 201, [], JSON_NUMERIC_CHECK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
