<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// Αντιπροσωπεύει μία κατηγορία αιτήματος.
//
// Περιλαμβάνει:
// - όνομα κατηγορίας
// - status
// - σχέση με τις αιτήματα

class Category extends Model
{
    protected $fillable = [
        'name',
        'status',
    ];

    protected $casts = [
        'status' => 'integer',
    ];

    // Οι αιτήματα που ανήκουν στην κατηγορία.
    public function reports(): HasMany
    {
        return $this->hasMany(Report::class);
    }
}