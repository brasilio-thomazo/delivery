<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PrinterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Pruduct\CategoryController;
use App\Http\Controllers\Pruduct\TypeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

/**
 * Rotas privadas que requer autenticação
 *
 * @return void
 */
function privates()
{
    Route::resources(['users' => UserController::class]);
    Route::resources(['clients' => ClientController::class]);
    Route::resources(['payments' => PaymentController::class]);
    //Route::resources(['orders' => OrderController::class]);
    Route::resources(['products' => ProductController::class]);
    Route::resources(['product/types' => TypeController::class]);
    Route::resources(['product/categories' => CategoryController::class]);
}

Route::post('login', [UserController::class, 'login']);
Route::get('me', [UserController::class, 'me']);
// Route::resources(['payments' => PaymentController::class]);
// Route::resources(['products' => ProductController::class]);
// Route::resources(['product/types' => TypeController::class]);
// Route::resources(['product/categories' => CategoryController::class]);
// Route::resources(['users' => UserController::class]);
// Route::resources(['clients' => ClientController::class]);
Route::resources(['printers' => PrinterController::class]);
Route::resources(['orders' => OrderController::class]);

//Route::resources(['users' => UserController::class]);
//Route::resources(['products' => ProductController::class]);

Route::middleware('auth:sanctum')->group(fn () => privates());
