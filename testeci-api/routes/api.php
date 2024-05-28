<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('generate-triangle', [\App\Http\Controllers\API\TriangleController::class, 'generateTriangle']);
Route::post('convert', [\App\Http\Controllers\API\NumberToWordsController::class, 'convert']);

Route::apiResource('departments', \App\Http\Controllers\API\DepartmentController::class);
Route::apiResource('levels', \App\Http\Controllers\API\LevelController::class);
Route::apiResource('karyawans', \App\Http\Controllers\API\KaryawanController::class);
Route::apiResource('jabatans', \App\Http\Controllers\API\JabatanController::class);
