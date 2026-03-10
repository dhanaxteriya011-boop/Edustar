<?php
// App\Models\Enquiry

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    protected $fillable = [
        'student_name','parent_name','phone','email',
        'grade','subject','message','status','ip_address',
    ];

    public function scopeNew($q)       { return $q->where('status', 'new'); }
    public function scopeEnrolled($q)  { return $q->where('status', 'enrolled'); }
}
