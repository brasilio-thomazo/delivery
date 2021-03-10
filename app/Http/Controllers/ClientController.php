<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\Rule;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Client::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = [
            'name'        => ['required'],
            'phone'       => [
                'required',
                Rule::unique('clients')->where('name', $request->name)
            ],
            'address'     => ['required'],
            'addr_number' => ['required']
        ];
        $request->validate($validate);

        $keys = ['name', 'phone', 'address', 'addr_number', 'addr_complement'];

        $client = new Client($request->only($keys));
        $client->save();
        return response($client, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        $validate = [];
        if ($request->name != $client->name) {
            $validate['name'] = ['required', Rule::unique('clients')->where('phone', $request->phone)];
        }
        if ($request->phone != $client->phone) {
            $validate['phone'] = ['required', Rule::unique('clients')->where('name', $request->name)];
        }
        if ($request->address != $client->address) {
            $validate['address'] = ['required'];
        }
        if ($request->addr_number != $client->addr_number) {
            $validate['addr_number'] = ['required'];
        }

        if (count($validate) || $request->addr_complement != $client->addr_complement) {
            $request->validate($validate);
            $keys = ['name', 'phone', 'address', 'addr_number', 'addr_complement'];
            $client->update($request->only($keys));
        }
        return Response::json($client, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        //
    }
}
