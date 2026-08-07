<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    //

    protected $fillable = [
        'title',
        'message',
        'type',
        'source_type',
        'source_id',
        'status',
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    // RELATIONS
    public function users()
    {
        return $this->belongsToMany(User::class, 'notification_user')
            ->withPivot('read_at')
            ->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    // HELPERS
    public function isRead(): bool
    {
        return $this->read_at !== null;
    }

    public function isUnread(): bool
    {
        return $this->read_at === null;
    }
}
