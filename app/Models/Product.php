<?php

namespace App\Models;

use App\Models\Product\Category;
use App\Models\Product\Type;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'id_type', 'id_category', 'description', 'cost', 'price'];

    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'id_category');
    }

    public function type()
    {
        return $this->hasOne(Type::class, 'id', 'id_type');
    }
}
