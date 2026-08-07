<?php

// Report API Controller
//
// Διαχειρίζεται τις αιτήματα της εφαρμογής.
//
// Περιλαμβάνει:
// - όλες τις αιτήματα για admin
// - αιτήματα συνδεδεμένου χρήστη
// - προβολή αιτήματος
// - δημιουργία αιτήματος
// - ενημέρωση αιτήματος
// - διαγραφή αιτήματος
// - report counts

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\Notification; //Notifications

class ReportApiController extends Controller
{
    // Επιστρέφει όλες τις αιτήματα.
    public function index(Request $request)
    {
        if (!in_array($request->user()->role, ['admin', 'worker'])) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        return response()->json([
            'data' => Report::with(['category', 'user'])
                ->latest()
                ->get(),
        ], 200);
    }

    // Επιστρέφει τις αιτήματα του συνδεδεμένου χρήστη.
    public function userReports(Request $request)
    {
        return response()->json([
            'data' => $request->user()
                ->reports()
                ->with('category')
                ->latest()
                ->get(),
        ], 200);
    }

    // Επιστρέφει μία συγκεκριμένη αίτημα.
    public function show(Request $request, Report $report)
    {
        $user = $request->user();

        if (
            $report->user_id !== $user->id &&
            !in_array($user->role, ['admin', 'worker'])
        ) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        return response()->json([
            'data' => $report->load(['category', 'user']),
        ], 200);
    }

    // Δημιουργεί νέα αίτημα.
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',

            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'postal_code' => [
                'nullable',
                'regex:/^[0-9]{3}\s?[0-9]{2}$/',
            ],

            'category_id' => 'required|exists:categories,id',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',

            // Path που επιστρέφει η Media Library.
            'photo' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        // Αποθηκεύει τον Τ.Κ. χωρίς κενό.
        if (!empty($data['postal_code'])) {
            $data['postal_code'] = str_replace(
                ' ',
                '',
                $data['postal_code']
            );
        }

        $report = Report::create([
            'title' => $data['title'],
            'user_id' => $request->user()->id,
            'description' => $data['description'] ?? null,
            'address' => $data['address'],
            'city' => $data['city'],
            'postal_code' => $data['postal_code'] ?? null,
            'status' => 'new',
            'category_id' => $data['category_id'],
            'lat' => $data['lat'],
            'lng' => $data['lng'],
            'photo' => $data['photo'] ?? null,
        ]);

        return response()->json([
            'message' => 'Η αίτημα δημιουργήθηκε επιτυχώς.',
            'data' => $report->load('category'),
        ], 201);
    }

    // Ενημερώνει αίτημα.
    // Ο ιδιοκτήτης μπορεί να αλλάξει τα βασικά στοιχεία,
    // ενώ admin/worker μπορούν επιπλέον να αλλάξουν το status.
    public function update(Request $request, Report $report)
    {
        $user = $request->user();

        if (
            $report->user_id !== $user->id &&
            !in_array($user->role, ['admin', 'worker'])
        ) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',

            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'postal_code' => [
                'nullable',
                'regex:/^[0-9]{3}\s?[0-9]{2}$/',
            ],

            'category_id' => 'required|exists:categories,id',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',

            'photo' => 'nullable|string|max:500',
        ];

        // Μόνο admin/worker μπορούν να αλλάξουν κατάσταση.
        if (in_array($user->role, ['admin', 'worker'])) {
            $rules['status'] = [
                'required',
                'in:new,in_progress,resolved',
            ];
        }

        $data = $request->validate($rules);

        if (!empty($data['postal_code'])) {
            $data['postal_code'] = str_replace(
                ' ',
                '',
                $data['postal_code']
            );
        }

        // Προστασία ώστε απλός user να μην αλλάζει status
        // ακόμη κι αν το στείλει χειροκίνητα στο request.
        if (!in_array($user->role, ['admin', 'worker'])) {
            unset($data['status']);
        }

        // Κρατάμε το προηγούμενο status
        // για να ελέγξουμε αν άλλαξε.
        $oldStatus = $report->status;

        $report->update($data);

        //  Automatic Notification

        //  Αν admin/worker αλλάξει την κατάσταση της αιτήματος,
        //  δημιουργείται αυτόματα ειδοποίηση για τον ιδιοκτήτη.
        if (isset($data['status']) && $oldStatus !== $report->status)
        {
            $statusLabels = [
                'new' => 'Νέα',
                'in_progress' => 'Σε εξέλιξη',
                'resolved' => 'Ολοκληρωμένη',
            ];

            $statusLabel =
                $statusLabels[$report->status] ??
                $report->status;

            $notification = Notification::create([
                'title' => 'Ενημέρωση αιτήματος',

                'message' =>
                    "Η κατάσταση της αιτήματος \"{$report->title}\" "
                    . "άλλαξε σε {$statusLabel}.",

                'type' => $report->status === 'resolved'
                    ? 'success'
                    : 'info',

                'source_type' => 'report',
                'source_id' => $report->id,

                'status' => 'active',
            ]);

            // Η ειδοποίηση αποστέλλεται μόνο
            // στον ιδιοκτήτη της αιτήματος.
            $notification->users()->attach(
                $report->user_id
            );
        }


        return response()->json([
            'message' => 'Η αίτημα ενημερώθηκε επιτυχώς.',
            'data' => $report->load(['category', 'user']),
        ], 200);
    }

    // Διαγράφει αίτημα του συνδεδεμένου χρήστη.
    public function destroy(Request $request, Report $report)
    {
        if ($report->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        // Δεν διαγράφεται το αρχείο από τη Media Library.
        $report->delete();

        return response()->json([
            'message' => 'Η αίτημα διαγράφηκε επιτυχώς.',
        ], 200);
    }

    // Επιστρέφει τα συνολικά report counts.
    public function counts(Request $request)
    {
        if (!in_array($request->user()->role, ['admin', 'worker'])) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        return response()->json([
            'total' => Report::count(),
            'new' => Report::where('status', 'new')->count(),
            'in_progress' => Report::where(
                'status',
                'in_progress'
            )->count(),
            'resolved' => Report::where(
                'status',
                'resolved'
            )->count(),
        ], 200);
    }

    // Επιστρέφει τα report counts του συνδεδεμένου χρήστη.
    public function userCounts(Request $request)
    {
        $reports = $request->user()->reports();

        return response()->json([
            'total' => (clone $reports)->count(),
            'new' => (clone $reports)
                ->where('status', 'new')
                ->count(),
            'in_progress' => (clone $reports)
                ->where('status', 'in_progress')
                ->count(),
            'resolved' => (clone $reports)
                ->where('status', 'resolved')
                ->count(),
        ], 200);
    }
}