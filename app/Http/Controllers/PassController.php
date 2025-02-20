<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PassController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'page_id' => 'required|exists:pages,id',
            'title' => 'required|string',
            'description' => 'required|string',
            'emoji' => 'required|string',
            'color' => 'required|string',
            'expires_at' => 'required|date',
        ]);

        try {
            $request->user()->passes()->create($validatedData);
        } catch (\Exception $exception) {
            Log::error('Unable to update page', [
                'exception' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', 'Unable to create pass');
        }

        return redirect()->back();
    }
}
