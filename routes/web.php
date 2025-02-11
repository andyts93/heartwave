<?php

use App\Http\Controllers\BottleMessageController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/page', [PageController::class, 'store'])->name('page.store');
    Route::put('/page/{page}', [PageController::class, 'update'])->name('page.update');

    Route::post('/vote', [VoteController::class, 'store'])->name('vote.store');
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::post('/bottle-message', [BottleMessageController::class, 'store'])->name('bottleMessage.store');
    Route::post('/quick-thought', [\App\Http\Controllers\QuickThoughtController::class, 'store'])->name('quick-thought.store');
});

Route::get('/page/{page}', [PageController::class, 'show'])->name('page.show');

require __DIR__ . '/auth.php';
