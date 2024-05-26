<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('generate-triangle', [\App\Http\Controllers\API\TriangleController::class, 'generateTriangle']);
Route::post('convert', [\App\Http\Controllers\API\NumberToWordsController::class, 'convert']);
