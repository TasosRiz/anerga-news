<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Notification;
use App\Models\User;

class NotificationController extends Controller
{
    // Get Notifications
    public function index()
    {
        $notifications = Notification::with('users')
            ->latest()
            ->get();

        return response()->json([
            'data' => $notifications,
        ]);
    }

    // Create
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],

            'type' => [
                'required',
                'in:info,warning,success,urgent',
            ],

            'recipients' => [
                'required',
                'in:all,active',
            ],

            'status' => [
                'required',
                'in:active,inactive',
            ],

            'source_type' => [
                'nullable',
                'in:system,report,post',
            ],

            'source_id' => [
                'nullable',
                'integer',
            ],
        ]);

        // Recipients
        $usersQuery = User::query();

        if ($validated['recipients'] === 'active') {
            $usersQuery->where('status', 'active');
        }

        $users = $usersQuery->get();

        if ($users->isEmpty()) {
            return response()->json([
                'message' => 'Δεν βρέθηκαν παραλήπτες.',
            ], 422);
        }

        $notification = DB::transaction(function () use ($users, $validated) {

            // Δημιουργείται μία μόνο ειδοποίηση.
            $notification = Notification::create([
                'title' => $validated['title'],
                'message' => $validated['message'],
                'type' => $validated['type'],

                'source_type' => $validated['source_type'] ?? 'system',
                'source_id' => $validated['source_id'] ?? null,

                'status' => $validated['status'],
            ]);

            // Συνδέουμε όλους τους παραλήπτες μέσω pivot table.
            $notification->users()->attach(
                $users->pluck('id')
            );

            return $notification;
        });

        return response()->json([
            'message' => 'Η ειδοποίηση δημιουργήθηκε επιτυχώς.',
            'recipients_count' => $users->count(),
            'data' => $notification->load('users'),
        ], 201);
    }

    // Update
    public function update(Request $request, Notification $notification)
    {
        $validated = $request->validate([
            'title' => [
                'sometimes',
                'required',
                'string',
                'max:255',
            ],

            'message' => [
                'sometimes',
                'required',
                'string',
            ],

            'type' => [
                'sometimes',
                'required',
                'in:info,warning,success,urgent',
            ],

            'status' => [
                'sometimes',
                'required',
                'in:active,inactive',
            ],
        ]);

        $notification->update($validated);

        return response()->json([
            'message' => 'Η ειδοποίηση ενημερώθηκε επιτυχώς.',
            'data' => $notification
                ->fresh()
                ->load('users'),
        ]);
    }

    //User Notification
    public function userNotifications(Request $request)
    {
        $user = $request->user();

        $notifications = $user->notifications()
            ->where('notifications.status', 'active')
            ->latest('notifications.created_at')
            ->get();

        return response()->json([
            'data' => $notifications,
        ]);
    }

    // Unread Notifications Count
    public function unreadCount(Request $request)
    {
        $user = $request->user();

        $count = $user->notifications()
            ->where('notifications.status','active')
            ->wherePivotNull('read_at')
            ->count();


        return response()->json([
            'count' => $count,
        ]);
    }

    // Mark As Read
     public function markAsRead(Request $request,Notification $notification)
    {
        $user = $request->user();

        $belongsToUser = $user->notifications()
            ->where('notifications.id',$notification->id)
            ->exists();

        if (!$belongsToUser){
            return response()->json([
                'message' => 'Η ειδοποίηση δεν ανήκει στον χρήστη.',
            ], 403);
        }

        $user->notifications()->updateExistingPivot(
            $notification->id,
            [
                'read_at' => now(),
            ]
        );

        return response()->json([
            'message' => 'Η ειδοποίηση σημειώθηκε ως διαβασμένη.',
        ]);
    }

    // Mark All Notifications As Read
    public function markAllAsRead(Request $request)
    {
        $user = $request->user();

        $user->notifications()
            ->wherePivotNull('read_at')
            ->updateExistingPivot(
                $user->notifications()
                    ->wherePivotNull('read_at')
                    ->pluck('notifications.id')
                    ->toArray(),
                [
                    'read_at' => now(),
                ]
            );

        return response()->json([
            'message' => 'Όλες οι ειδοποιήσεις σημειώθηκαν ως διαβασμένες.',
        ]);
    }

    // Delete
    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json([
            'message' => 'Η ειδοποίηση διαγράφηκε επιτυχώς.',
        ], 200);
    }
}