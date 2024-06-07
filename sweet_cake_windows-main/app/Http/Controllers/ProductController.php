<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get();

        return Inertia::render('Product/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Product/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'required|numeric',
            'name' => 'required',
            'description' => 'required'
        ]);

        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('images'), $imageName);

        Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'img' => $imageName,
        ]);


        return Redirect::route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Product/Edit', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'description' => $product->description,
                'img' => $product->img,
                'ingredients' => $product->ingredients,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {

        $request->validate([
            'price' => 'required|numeric',
            'name' => 'required',
            'description' => 'required'
        ]);

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {

        foreach ($product->ingredients as $ingredient) {
            $ingredient->delete();
        }

        $product->delete();

        return Redirect::route('products.index');
    }
}
