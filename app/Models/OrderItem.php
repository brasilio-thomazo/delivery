<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $table = 'order_items';
    protected $fillable = ['id_order', 'price', 'cost'];

    public function order()
    {
        return $this->hasOne(Order::class, 'id_order', 'id');
    }

    public function parts()
    {
        return $this->hasMany(OrderItemPart::class, 'id_order_item', 'id')->with(['product']);
    }
}
