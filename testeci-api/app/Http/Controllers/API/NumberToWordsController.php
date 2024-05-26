<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NumberToWordsController extends Controller
{
    public function convert(Request $request)
    {
        $number = $request->input('number');
        if (!is_numeric($number)) {
            return response()->json(['error' => 'Invalid number'], 400);
        }

        $result = $this->convertNumberToWords($number);
        return response()->json(['terbilang' => $result . ' rupiah']);
    }

    private function convertNumberToWords($number)
    {
        $units = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
        $tens = ['', 'sepuluh', 'dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh', 'enam puluh', 'tujuh puluh', 'delapan puluh', 'sembilan puluh'];
        $teens = ['sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];

        if ($number < 10) {
            return $units[$number];
        }

        if ($number < 20) {
            return $teens[$number - 10];
        }

        if ($number < 100) {
            return $tens[(int)($number / 10)] . ' ' . $units[$number % 10];
        }

        if ($number < 1000) {
            if ($number < 200) {
                return 'seratus ' . $this->convertNumberToWords($number - 100);
            }
            return $units[(int)($number / 100)] . ' ratus ' . $this->convertNumberToWords($number % 100);
        }

        if ($number < 1000000) {
            if ($number < 2000) {
                return 'seribu ' . $this->convertNumberToWords($number - 1000);
            }
            return $this->convertNumberToWords((int)($number / 1000)) . ' ribu ' . $this->convertNumberToWords($number % 1000);
        }

        if ($number < 1000000000) {
            return $this->convertNumberToWords((int)($number / 1000000)) . ' juta ' . $this->convertNumberToWords($number % 1000000);
        }

        return $this->convertNumberToWords((int)($number / 1000000000)) . ' milyar ' . $this->convertNumberToWords($number % 1000000000);
    }
}
