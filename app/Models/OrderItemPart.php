<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItemPart extends Model
{
    use HasFactory;

    protected $table = 'order_item_parts';
    protected $fillable = ['id_order_item', 'id_product', 'cost', 'price'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'id_product', 'id')->with(['type', 'category']);
    }
}
