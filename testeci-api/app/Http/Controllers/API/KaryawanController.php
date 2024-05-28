<?php

namespace App\Http\Controllers\API;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\Karyawan;
use Illuminate\Http\Request;

class KaryawanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $karyawans = Karyawan::with('jabatan.level')->get();

        return ResponseFormatter::success(
            $karyawans, 'Successfully fetch karyawan data'
        );
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
        $request->validate([
            'nik' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'ttl' => 'required|date',
            'alamat' => 'required|string|max:255',
            'id_jabatan' => 'required|exists:jabatans,id_jabatan',
        ]);

        $karyawan = Karyawan::create($request->all());
        return ResponseFormatter::success($karyawan, 'Success to create karyawan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $karyawan = Karyawan::with('jabatan.level')->findOrFail($id);
        return ResponseFormatter::success($karyawan, 'Karyawan detail');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nik' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'ttl' => 'required|date',
            'alamat' => 'required|string|max:255',
            'id_jabatan' => 'required|exists:jabatans,id_jabatan',
        ]);

        $karyawan = Karyawan::findOrFail($id);
        $karyawan->update($request->all());
        return ResponseFormatter::success($karyawan, 'Success to updated karyawan');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $karyawan = Karyawan::findOrFail($id);
        $karyawan->delete();

        return ResponseFormatter::success(
            null, 'Success to delete karyawan'
        );
    }
}
