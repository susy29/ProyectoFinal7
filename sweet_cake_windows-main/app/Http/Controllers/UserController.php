<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{

    public function index(Request $request)
    {

        $products = Product::all();
        foreach ($products as $product) {
            $product->ingredients;
        }

        return Inertia::render('User/Home', [
            'products' => $products,
            'message' => session('message'),
            'created_order_id' => session('created_order_id'),
        ]);
    }
}
