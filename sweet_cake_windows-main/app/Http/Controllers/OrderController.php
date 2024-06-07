<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $penging_orders = Order::where('status', 'pending')->get();
        $delivered_orders = Order::where('status', 'Entregado')->get();

        foreach ($penging_orders as $order) {
            $order->products = json_decode($order->products);
            $order->user = User::find($order->user_id);
        }

        foreach ($delivered_orders as $order) {
            $order->products = json_decode($order->products);
            $order->user = User::find($order->user_id);
        }


        return Inertia::render('Order/Index', [
            'penging_orders' => $penging_orders,
            'delivered_orders' => $delivered_orders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user_id = Auth::id();

        /* $request->validate([
            'products' => 'required|string',
            'payment_method_type' => 'required|string',
            'payment_method_data' => 'required|string',
            'total' => 'required|numeric',
            'delivery_data' => 'required|string',
            'delivery_type' => 'required|string',
        ]); */

        $order = Order::create([
            'user_id' => $user_id,
            'products' => $request->products,
            'payment_method_type' => $request->payment_method_type,
            'payment_method_data' => $request->payment_method_data,
            'total' => $request->total,
            'delivery_data' => $request->delivery_data,
            'delivery_type' => $request->delivery_type,
        ]);

        return Redirect::route('orders.show', ['order' => $order->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $user = User::find($order->user_id);

        $order->user = $user;

        return Inertia::render('Order/Show', [
            'order' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {


        $order->update([
            'status' => 'Entregado',
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
