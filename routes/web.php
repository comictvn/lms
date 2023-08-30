<?php

use App\Http\Controllers\Auth\AccessTokenController;
use App\Http\Controllers\Auth\RevokeTokenController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::group([
    'as' => 'passport.',
    'prefix' => config('passport.path', 'oauth'),
], function () {
        Route::post('revoke', [RevokeTokenController::class, 'revoke'])->middleware(['auth:admins,users'])->name('revoke');
        Route::post('token', [AccessTokenController::class, 'issueToken'])->middleware('throttle')->name('token');

        ////////////////////////////////////DEFAULT_PASSPORT_ROUTES - WEB//////////////////////////////////////
    //    require __DIR__.'/passport.php';
    });
