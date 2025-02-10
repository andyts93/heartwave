<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VoteController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'page_id' => 'required|exists:pages,id',
            'vote' => 'required|integer|min:-10|max:10',
            'notes' => 'nullable|string',
            'image' => 'file|max:2048|mimes:jpg,png,jpeg,gif,heic',
            'visible_at' => 'nullable|date',
        ]);

        try {
            $vote = $request->user()->votes()->make($validatedData);
            if ($file = $request->file('image')) {
                $fileName = time() . uniqid() . '.' . $file->getClientOriginalExtension();
                $vote->image = $file->storeAs('uploads', $fileName, 'public');
            }
            $vote->save();
        } catch (\Exception $exception) {
            Log::error('Unable to create comment', [
                'exception' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', 'Unable to throw the bottle');
        }

        return redirect()->back();
    }
}
