<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

// Αντιπροσωπεύει έναν χρήστη της εφαρμογής.
//
// Περιλαμβάνει:
// - βασικά στοιχεία χρήστη
// - role και status
// - Sanctum API authentication
// - hidden πεδία
// - casts
// - σχέση με τις αιτήματα

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'role',
        'status',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // RELATIONS

    // Οι αιτήματα που έχει δημιουργήσει ο χρήστης.
    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function notifications()
    {
        return $this->belongsToMany(Notification::class, 'notification_user')
            ->withPivot('read_at')
            ->withTimestamps();
    }

}