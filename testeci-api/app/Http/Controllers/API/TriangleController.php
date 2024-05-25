<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TriangleController extends Controller
{
    public function generateTriangle(Request $request)
    {
        $input = $request->input('rows');
        $type = $request->input('type', 'default');
        $triangle = '';

        switch ($type) {
            case 'type1':
                for ($i = 1; $i <= $input; $i++) {
                    $triangle .= str_repeat('* ', $i) . '<br>';
                }
                break;
            case 'type2':
                for ($i = $input; $i >= 1; $i--) {
                    $triangle .= str_repeat('* ', $i) . '<br>';
                }
                break;
            case 'type3':
                for ($i = 1; $i <= $input; $i++) {
                    $triangle .= str_repeat("&nbsp", 2 * ($input - $i)) . str_repeat("* ", $i) . '<br>';
                }
                break;
            default:
                return response('Invalid type', 400);
        }

        return response($triangle, 200)->header('Content-Type', 'text/html');
    }
}
