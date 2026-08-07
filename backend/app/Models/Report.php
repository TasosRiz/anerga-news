<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

// Αντιπροσωπεύει μία αίτημα πολίτη.
//
// Περιλαμβάνει:
// - στοιχεία αιτήματος
// - διεύθυνση και συντεταγμένες
// - φωτογραφία
// - σύνδεση με χρήστη
// - σύνδεση με κατηγορία

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'description',
        'address',
        'city',
        'postal_code',
        'status',
        'lat',
        'lng',
        'photo',
    ];

    protected $casts = [
        'lat' => 'decimal:7',
        'lng' => 'decimal:7',
    ];

    // Ο χρήστης που δημιούργησε την αίτημα.
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Η κατηγορία της αιτήματος.
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}