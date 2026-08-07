<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// Αντιπροσωπεύει μία ανακοίνωση.
//
// Περιλαμβάνει:
// - τίτλο και περιεχόμενο
// - κατηγορία
// - φωτογραφία
// - status
// - ημερομηνία δημοσίευσης
// - δημιουργό της ανακοίνωσης

class Post extends Model
{
    protected $fillable = [
        'title',
        'body',
        'category_id',
        'photo',
        'status',
        'created_by',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Ο χρήστης που δημιούργησε την ανακοίνωση.
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Η κατηγορία της ανακοίνωσης.
    public function category(): BelongsTo
    {
        return $this->belongsTo(PostCategory::class, 'category_id');
    }
}