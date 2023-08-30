<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HealthCheckController;
use App\Http\Controllers\Api\UserController;
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
Route::any('/health-check', [HealthCheckController::class, 'index'])->name('health-check');

////////////////////////////////////EMAIL_AUTHENTICATION - API//////////////////////////////////////
Route::controller(AuthController::class)->group(function () {
    Route::post('/users_reset_password_requests', 'userResetPassword')->name('userResetPassword');
    Route::post('/users_verify_reset_password_requests', 'userVerifyResetPassword')->name('userVerifyResetPassword');
    Route::post('/users_registrations', 'userEmailRegistration')->name('userEmailRegistration');
    Route::post('/users_passwords', 'userChangePassword')->name('userChangePassword')
        ->middleware(['auth:users']);
    Route::post('/users_verify_confirmation_token', 'userVerifyEmail')->name('userVerifyEmail');
    Route::post('/users_unlock', 'userUnlock')->name('userUnlock');
});

////////////////////////////////////USER - API//////////////////////////////////////
Route::controller(UserController::class)->as('user.')->group(function () {
    Route::get('/users', 'filter')->name('filter')
    ->middleware(['auth:users']);
    Route::post('/users', 'create')->name('create')
    ->middleware(['auth:users']);
    Route::put('/users/{id}', 'update')->name('update')
    ->middleware(['auth:users']);
    Route::delete('/users/{id}', 'delete')->name('delete')
    ->middleware(['auth:users']);
});
