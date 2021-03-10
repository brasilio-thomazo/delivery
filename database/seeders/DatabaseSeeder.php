<?php

namespace Database\Seeders;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        User::create([
            'name'     => 'Sistema',
            'username' => 'system',
            'email'    => 'system@localhost',
            'password' => Hash::make('system'),
        ]);
        User::create([
            'name'     => 'admin',
            'username' => 'admin',
            'email'    => 'admin@localhost',
            'password' => Hash::make('admin'),
        ]);

        DB::table('order_item_parts')->truncate();
        DB::table('order_items')->truncate();
        DB::table('orders')->truncate();
        DB::table('payments')->truncate();
        Payment::create([
            'name'  => 'Dinheiro',
            'repay' => true,
        ]);
        Payment::create([
            'name'  => 'Débito',
            'repay' => true,
        ]);
        Payment::create([
            'name'  => 'Crédito',
            'repay' => true,
        ]);
        Payment::create([
            'name'  => 'VR',
            'repay' => false,
        ]);
        // \App\Models\User::factory(10)->create();
    }
}
