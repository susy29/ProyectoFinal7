<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
            'passwordHint' => session('passwordHint'),
            'message' => session('message'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
            'username' => 'required|string|max:255'
        ]);


        $user = User::where('email', $request->email)->where('username', $request->username)->first();

        if ($user == null) {
            return back()->with('message', 'Error: Usuario no encontrado');
        }



        return back()->with('passwordHint', $user->password_hint);
    }
}
