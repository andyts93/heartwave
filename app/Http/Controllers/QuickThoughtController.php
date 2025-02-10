<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class QuickThoughtController extends Controller
{
    public function store(Request $request) {
        $validatedData = $request->validate([
            'emoji' => 'required',
            'unified' => 'required|string',
            'page_id' => 'required|exists:pages,id',
        ]);

        try {
            $request->user()->quickThoughts()
                ->create($validatedData);
        } catch (\Exception $exception) {
            Log::error('Unable to add quick thought', [
                'exception' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', 'Unable to add quick thought');
        }

        return redirect()->back();
    }
}
