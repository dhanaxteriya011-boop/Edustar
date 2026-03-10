<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:150',
            'phone'   => 'required|string|max:20',
            'email'   => 'nullable|email',
            'message' => 'required|string|max:2000',
        ]);

        ContactMessage::create($request->only(['name', 'phone', 'email', 'message']));

        return response()->json([
            'success' => true,
            'message' => 'Message received! We will contact you shortly.',
        ], 201);
    }
}
