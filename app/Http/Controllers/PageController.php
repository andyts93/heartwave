<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
        ]);

        try {
            $page = Page::query()->create($validatedData);
            // Create the user's page
            $linkedPage = $request->user()->pages()->create([...$validatedData, 'linked_page_id' => $page->id, 'name' => $request->user()->name]);
            $page->update(['linked_page_id' => $linkedPage->id]);
        } catch (\Exception $exception) {
            Log::error('Unable to create page', [
                'exception' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', 'Unable to create the page');
        }

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        $page->load([
            'user',
            'votes' => fn($qb) => $qb->orderByDesc('created_at'),
            'votes.user',
            'votes.comments' => fn($qb) => $qb->with('user')->orderByDesc('created_at'),
            'lastBottleMessage.user',
            'lastQuickThought.user',
        ]);

        $page->average = $page->votes()->avg('vote');

        return Inertia::render('Page', compact('page'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        //
    }
}
