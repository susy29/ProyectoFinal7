<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'user_id',
        'payment_method_type',
        'payment_method_data',
        'products',
        'total',
        'delivery_data',
        'delivery_type'
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
