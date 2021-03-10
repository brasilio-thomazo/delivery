<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 25);
            $table->unsignedBigInteger('id_type');
            $table->unsignedBigInteger('id_category');
            $table->string('description')->nullable();
            $table->float('cost');
            $table->float('price');
            $table->timestamps();
            $table->foreign('id_type')->references('id')->on('product_types')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('id_category')->references('id')->on('product_categories')->onUpdate('cascade')->onDelete('cascade');
            $table->unique(['name', 'id_type', 'id_category']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
