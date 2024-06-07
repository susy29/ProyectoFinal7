<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('address')->nullable();
            $table->string('status')->default('pending');
            $table->string('payment_method_type')->default('Efectivo');
            $table->longText('payment_method_data')->nullable();
            $table->longText('products')->nullable();
            $table->double('total');
            $table->longText('delivery_data')->nullable();
            $table->string('delivery_type')->default('Envío a domicilio');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
