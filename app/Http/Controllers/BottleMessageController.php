<?php

namespace App\Http\Controllers;

use App\Models\BottleMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BottleMessageController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'message' => 'required|string',
            'image' => 'file|max:2048|mimes:jpg,png,jpeg,gif,heic',
            'page_id' => 'required|exists:pages,id',
        ]);

        try {
            $message = new BottleMessage();
            $message->message = $validatedData['message'];
            $message->user_id = $request->user()->id;
            $message->page_id = $validatedData['page_id'];
            if ($file = $request->file('image')) {
                $fileName = time() . uniqid() . '.' . $file->getClientOriginalExtension();
                $message->image = $file->storeAs('uploads', $fileName, 'public');
            }
            $message->save();
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
