<?php
namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Notification; //Notifications
use App\Models\User; //Users

// Διαχειρίζεται τις ανακοινώσεις της εφαρμογής.
//
// Περιλαμβάνει:
// - λίστα posts για admin
// - δημιουργία, ενημέρωση και διαγραφή post
// - δημόσια προβολή ενεργών posts
// - posts counts για το dashboard


class PostController extends Controller
{
    // Επιστρέφει όλα τα posts για το admin panel.
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $posts = Post::with('category')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'data' => $posts,
        ], 200);
    }

    // Δημιουργεί νέα ανακοίνωση.
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'nullable|string',
            'category_id' => 'nullable|exists:post_categories,id',
            'photo' => 'nullable|string|max:500',
            'status' => 'required|in:active,inactive',
            'published_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $post = Post::create([
            'title' => $data['title'],
            'body' => $data['body'] ?? null,
            'category_id' => $data['category_id'] ?? null,
            'photo' => $data['photo'] ?? null,
            'status' => $data['status'],
            'published_at' => $data['published_at'] ?? null,
            'created_by' => $request->user()->id,
        ]);

        // Automatic Notification

        // Αν το post δημιουργηθεί ως active, δημιουργείται αυτόματα
        // ειδοποίηση για τους χρήστες της εφαρμογής.
        if ($post->status === 'active') {
            $notification = Notification::create([
                'title' => 'Νέα ανακοίνωση',
                'message' => "Δημοσιεύτηκε νέα ανακοίνωση: \"{$post->title}\".",
                'type' => 'info',
                'source_type' => 'post',
                'source_id' => $post->id,
                'status' => 'active',
            ]);

            // Παίρνουμε όλους τους users εκτός admin.
            $userIds = User::where('role', '!=', 'admin')
                ->pluck('id');

            // Συνδέουμε την ειδοποίηση με τους παραλήπτες.
            $notification->users()->attach($userIds);
        }

        return response()->json([
            'message' => 'Post created successfully.',
            'data' => $post->load('category'),
        ], 201);
    }

    // Ενημερώνει μία υπάρχουσα ανακοίνωση.
    public function update(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $post = Post::find($id);

        if ($post === null) {
            return response()->json([
                'message' => 'Post not found.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'nullable|string',
            'category_id' => 'nullable|exists:post_categories,id',
            'photo' => 'nullable|string|max:500',
            'status' => 'required|in:active,inactive',
            'published_at' => 'nullable|date',
            'notify_users' => 'sometimes|boolean', //Notifications
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        // Κρατάμε το παλιό status
        $oldStatus = $post->status;

        // Παίρνουμε την επιλογή για notification.
        $notifyUsers = $request->boolean('notify_users');

        // Το notify_users δεν είναι πεδίο του posts table.
        unset($data['notify_users']);

        // Ενημέρωση post.
        $post->update($data);


        // Notification on Publish

        // Αν το post γίνει active και το notify_users είναι true,
        // δημιουργείται ειδοποίηση για τους χρήστες.
        $notifyUsers = $request->boolean('notify_users');


        // Notification on Publish
        if ( $oldStatus !== 'active' &&
             $post->status === 'active' &&
             $notifyUsers)
        {
            $notification = Notification::create([
                'title' => 'Νέα ανακοίνωση',
                'message' => "Δημοσιεύτηκε ανακοίνωση: \"{$post->title}\".",
                'type' => 'info',
                'source_type' => 'post',
                'source_id' => $post->id,
                'status' => 'active',
            ]);

            $userIds = User::where('role', '!=' ,'admin')
                ->pluck('id');

            $notification->users()->attach($userIds);
        }


        return response()->json([
            'message' => 'Post updated successfully.',
            'data' => $post->load('category'),
        ], 200);
    }

    // Διαγράφει μία ανακοίνωση.
    public function destroy(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $post = Post::find($id);

        if ($post === null) {
            return response()->json([
                'message' => 'Post not found.',
            ], 404);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully.',
        ], 200);
    }

    // Επιστρέφει όλες τις ενεργές δημόσιες ανακοινώσεις.
    public function publicIndex()
    {
        $posts = Post::with('category')
            ->where('status', 'active')
            ->orderByRaw('published_at IS NULL')
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'data' => $posts,
        ], 200);
    }

    // Επιστρέφει μία ενεργή δημόσια ανακοίνωση.
    public function publicShow(int $id)
    {
        $post = Post::with('category')
            ->where('status', 'active')
            ->find($id);

        if ($post === null) {
            return response()->json([
                'message' => 'Post not found.',
            ], 404);
        }

        return response()->json([
            'data' => $post,
        ], 200);
    }

    // Επιστρέφει τα συνολικά posts counts.
    public function postsCounts()
    {
        return response()->json([
            'total' => Post::count(),

            'active' => Post::where(
                'status',
                'active'
            )->count(),

            'inactive' => Post::where(
                'status',
                'inactive'
            )->count(),

            'new' => Post::where('status', 'active')
                ->where('created_at', '>=', now()->subDays(7))
                ->count(),
        ], 200);
    }
}