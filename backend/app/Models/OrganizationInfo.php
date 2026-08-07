<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Αποθηκεύει τα βασικά στοιχεία του οργανισμού.
//
// Περιλαμβάνει:
// - όνομα εφαρμογής
// - όνομα οργανισμού
// - πόλη
// - στοιχεία επικοινωνίας
// - βασικά χρώματα
// - logo

class OrganizationInfo extends Model
{
    protected $fillable = [
        'app_name',
        'organization_name',
        'city',
        'email',
        'phone',
        'address',
        'primary_color',
        'secondary_color',
        'logo',
    ];
}