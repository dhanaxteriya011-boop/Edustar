<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AuthController;

// ── Public ──
Route::post('/enquiry', [EnquiryController::class, 'store']);
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/login',   [AuthController::class,   'login']);

// ── Authenticated ──
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Admin only
    Route::middleware('role:admin')->group(function () {
        Route::get('/enquiries',                          [EnquiryController::class, 'index']);
        Route::patch('/enquiries/{enquiry}/status',       [EnquiryController::class, 'updateStatus']);
    });
});
