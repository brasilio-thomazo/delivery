<?php
/**
 * Controlador de usuários.
 */

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(User::all(), 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response($user, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user Objeto de usuário
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
    }

    public function me()
    {
        if (Auth::check()) {
            return response(['error' => false, 'user' => Auth::user(), 'message' => 'Este sou eu'], 201);
        }
        return response(['error' => true, 'user'=>[], 'message' => 'Usário não logado.']);
    }

    /**
     * Efetua o login da api.
     *
     * @param \Illuminate\Http\Request $request Request com usuário e senha
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate(['username' => ['required'], 'password' => ['required']]);
        if (Auth::attempt($request->only('username', 'password'))) {
            $user = Auth::user();
            /*
            //$token = $user->createToken('teste');
            $response = [
                //'token'   => $token->plainTextToken,
                'user'    => $user,
                'message' => 'Login efetuado com sucesso',
                'errors'  => [],
            ];
            */
            return response($user, 201);
        } else {
            $response = [
                'message' => 'Usuário e(ou) senha incorreto(s)',
                'errors'  => [],
            ];

            return response($response, 401);
        }
    }
}
