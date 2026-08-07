<?php
namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

// Διαχειρίζεται το authentication και βασικές
// λειτουργίες χρηστών.
//
// Περιλαμβάνει:
// - στοιχεία συνδεδεμένου χρήστη
// - login
// - register
// - logout
// - λίστα χρηστών
// - στατιστικά χρηστών
// - ενημέρωση χρήστη

class UsersController extends Controller
{
    // Επιστρέφει τον συνδεδεμένο χρήστη.
    public function index(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ], 200);
    }

    // Συνδέει τον χρήστη και δημιουργεί Sanctum token.
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        // Ελέγχει αν υπάρχει χρήστης και αν ο κωδικός είναι σωστός.
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Το email ή ο κωδικός είναι λάθος.'],
            ]);
        }

        // Δεν επιτρέπει login σε ανενεργό χρήστη.
        if ($user->status !== 'active') {
            return response()->json([
                'message' => 'Ο λογαριασμός είναι ανενεργός.',
            ], 403);
        }

        $token = $user
            ->createToken('servicekit-api-token')
            ->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
            ],
        ], 200);
    }

    // Δημιουργεί νέο χρήστη με default role user.
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => 'user',
            'status' => 'active',
            'password' => Hash::make($validated['password']),
        ]);

        // Δημιουργεί API token για τον νέο χρήστη.
        $token = $user
            ->createToken('servicekit-api-token')
            ->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
            ],
        ], 201);
    }

    // Διαγράφει το ενεργό Sanctum token.
    public function logout(Request $request)
    {
        $token = $request->user()->currentAccessToken();

        if ($token !== null) {
            $token->delete();
        }

        return response()->json([
            'message' => 'Επιτυχής αποσύνδεση.',
        ], 200);
    }

    // Επιστρέφει όλους τους χρήστες για το admin panel.
    public function allUsers(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $users = User::select(
            'id',
            'name',
            'email',
            'role',
            'status',
            'created_at'
        )
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'data' => $users,
        ], 200);
    }

    // Επιστρέφει στατιστικά χρηστών για το admin dashboard.
    public function userStats(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        return response()->json([
            'data' => [
                'total' => User::count(),
                'admins' => User::where('role', 'admin')->count(),
                'users' => User::where('role', 'user')->count(),
                'new' => User::where(
                    'created_at',
                    '>=',
                    now()->subDays(30)
                )->count(),
            ],
        ], 200);
    }

    // Ενημερώνει τα στοιχεία ενός χρήστη.
    public function updateUser(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $user = User::find($id);

        if ($user === null) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|in:user,admin,worker',
            'status' => 'required|in:active,inactive',
        ]);

        // Επιστρέφει τα validation errors.
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        // Ενημερώνει τον χρήστη μόνο με validated δεδομένα.
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'status' => $validated['status'],
        ]);

        return response()->json([
            'message' => 'User updated successfully.',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'status' => $user->status,
                'created_at' => $user->created_at,
            ],
        ], 200);
    }
}