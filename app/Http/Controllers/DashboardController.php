<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $pages = $request->user()->pages()->with('linkedPage')->get();

        return Inertia::render('Dashboard', compact('pages'));
    }
}
