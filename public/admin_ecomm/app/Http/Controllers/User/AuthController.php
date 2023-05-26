<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function Login(Request $request) {

        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;

                return response([
                    'message' => "Successfully Logged In",
                    'token' => $token,
                    'user' => $user
                ], 200); // States code
            }
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }

        return response([
            'message' => "Invalid Email Or Password"
        ], 401);

    } // end method

    public function Register(RegisterRequest $request) {

        try {

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $token = $user->createToken('app')->accessToken;

            return response([
                'message' => "Registration Successful",
                'token' => $token,
                'user' => $user
            ], 200);

        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }

    } // end method
}
