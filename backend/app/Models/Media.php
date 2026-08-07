<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// Αντιπροσωπεύει ένα αρχείο της Media Library.
//
// Περιλαμβάνει:
// - όνομα αρχείου
// - path αρχείου
// - folder
// - σχέση με το MediaFolder

class Media extends Model
{
    protected $table = 'media';

    protected $fillable = [
        'file_name',
        'path',
        'media_folder_id',
    ];

    // Ο φάκελος στον οποίο ανήκει το αρχείο.
    public function folder(): BelongsTo
    {
        return $this->belongsTo(
            MediaFolder::class,
            'media_folder_id'
        );
    }
}