<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'comment' => 'required|string',
            'image' => 'string',
            'vote_id' => 'required|exists:votes,id'
        ]);

        try {
            $request->user()->comments()->create($validatedData);
        } catch (\Exception $exception) {
            Log::error('Unable to create comment', [
                'exception' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', 'Unable to create comment');
        }

        return redirect()->back();
    }
}
