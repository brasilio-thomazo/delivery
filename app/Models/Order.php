<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = [
        'id_user',
        'id_client',
        'id_payment',
        'price',
        'cost',
        'pay',
        'repay',
        'observation',
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'id_user');
    }

    public function client()
    {
        return $this->hasOne(Client::class, 'id', 'id_client');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, 'id', 'id_payment');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'id_order', 'id')->with(['parts']);
    }
}
