<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// Αντιπροσωπεύει μία κατηγορία ανακοίνωσης.
//
// Περιλαμβάνει:
// - όνομα κατηγορίας
// - status
// - σχέση με τα posts

class PostCategory extends Model
{
    protected $fillable = [
        'name',
        'status',
    ];

    protected $casts = [
        'status' => 'integer',
    ];

    // Οι ανακοινώσεις που ανήκουν στην κατηγορία.
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'category_id');
    }
}