<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemPartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_item_parts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_order_item');
            $table->unsignedBigInteger('id_product');
            $table->unsignedFloat('cost');
            $table->unsignedFloat('price');
            $table->foreign('id_order_item')->references('id')->on('order_items')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('id_product')->references('id')->on('products')->onUpdate('cascade')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_item_parts');
    }
}
