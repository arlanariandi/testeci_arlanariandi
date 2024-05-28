<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jabatan extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_jabatan';

    protected $fillable = [
        'nama_jabatan', 'id_level'
    ];

    public function level()
    {
        return $this->belongsTo(Level::class, 'id_level');
    }

    public function karyawans()
    {
        return $this->hasMany(Karyawan::class, 'id_jabatan');
    }

}
