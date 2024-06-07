<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'product_id',
    ];

    public function product()
    {
        return $this->hasOne(Product::class);
    }
}
