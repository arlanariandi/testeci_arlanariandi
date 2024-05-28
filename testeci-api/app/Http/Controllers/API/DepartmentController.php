<?php

namespace App\Http\Controllers\API;

use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Department::all();
        if ($departments) {
            return ResponseFormatter::success(
                $departments, 'Successfully fetch departments data'
            );
        }

        return ResponseFormatter::error(null, 'Failed to retrieve department data', 404);
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
            'nama_dept' => 'required|string|max:255',
        ]);

        $department = Department::create($request->all());
        return ResponseFormatter::success(
            $department, 'Success to create department'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $department = Department::findOrFail($id);

        return ResponseFormatter::success(
            $department, 'Department detail'
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
            'nama_dept' => 'required|string|max:255',
        ]);

        $department = Department::findOrFail($id);
        $department->update($request->all());

        return ResponseFormatter::success(
            $department, 'Success to update department'
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return ResponseFormatter::success(
            null, 'Success to delete department'
        );
    }
}
