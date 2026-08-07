<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// Αντιπροσωπεύει έναν φάκελο της Media Library.
//
// Περιλαμβάνει:
// - όνομα φακέλου
// - slug
// - σχέση με τα media αρχεία

class MediaFolder extends Model
{
    protected $fillable = [
        'name',
        'slug',
    ];

    // Τα media αρχεία που ανήκουν στον φάκελο.
    public function media(): HasMany
    {
        return $this->hasMany(
            Media::class,
            'media_folder_id'
        );
    }
}