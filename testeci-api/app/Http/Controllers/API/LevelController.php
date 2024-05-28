<?php

namespace App\Http\Controllers\API;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\Level;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $levels = Level::all();
        if ($levels) {
            return ResponseFormatter::success(
                $levels, 'Successfully fetch level data'
            );
        }

        return ResponseFormatter::error(null, 'Failed to retrieve level data', 404);
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
            'nama_level' => 'required|string|max:255',
        ]);

        $department = Level::create($request->all());
        return ResponseFormatter::success(
            $department, 'Success to create level'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $department = Level::findOrFail($id);

        return ResponseFormatter::success(
            $department, 'Level detail'
        );
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
            'nama_level' => 'required|string|max:255',
        ]);

        $level = Level::findOrFail($id);
        $level->update($request->all());

        return ResponseFormatter::success(
            $level, 'Success to update level'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $department = Level::findOrFail($id);
        $department->delete();

        return ResponseFormatter::success(
            null, 'Success to delete level'
        );
    }
}
