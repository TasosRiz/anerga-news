<?php


namespace App\Http\Controllers;

use App\Models\PostCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

// Διαχειρίζεται τις κατηγορίες των ανακοινώσεων.
//
// Περιλαμβάνει:
// - λίστα κατηγοριών για admin
// - δημιουργία κατηγορίας
// - ενημέρωση κατηγορίας
// - διαγραφή κατηγορίας
// - δημόσια λίστα ενεργών κατηγοριών


class PostCategoryController extends Controller
{
    // Επιστρέφει όλες τις κατηγορίες για το admin panel.
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $categories = PostCategory::orderByDesc('created_at')->get();

        return response()->json([
            'data' => $categories,
        ], 200);
    }

    // Δημιουργεί νέα κατηγορία ανακοίνωσης.
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:post_categories,name',
            'status' => 'required|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $category = PostCategory::create(
            $validator->validated()
        );

        return response()->json([
            'message' => 'Post Category added successfully.',
            'data' => $category,
        ], 201);
    }

    // Ενημερώνει μία υπάρχουσα κατηγορία ανακοίνωσης.
    public function update(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $category = PostCategory::find($id);

        if ($category === null) {
            return response()->json([
                'message' => 'Post Category not found.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:post_categories,name,' . $category->id,
            'status' => 'required|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $category->update(
            $validator->validated()
        );

        return response()->json([
            'message' => 'Post Category updated successfully.',
            'data' => $category,
        ], 200);
    }

    // Διαγράφει μία κατηγορία ανακοίνωσης.
    public function destroy(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $category = PostCategory::find($id);

        if ($category === null) {
            return response()->json([
                'message' => 'Post Category not found.',
            ], 404);
        }

        // Δεν επιτρέπει διαγραφή κατηγορίας που χρησιμοποιείται.
        if ($category->posts()->exists()) {
            return response()->json([
                'message' => 'Η κατηγορία χρησιμοποιείται από ανακοινώσεις και δεν μπορεί να διαγραφεί.',
            ], 409);
        }

        $category->delete();

        return response()->json([
            'message' => 'Post Category deleted successfully.',
        ], 200);
    }

    // Επιστρέφει μόνο τις ενεργές δημόσιες κατηγορίες.
    public function publicIndex()
    {
        $categories = PostCategory::where('status', 1)
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $categories,
        ], 200);
    }
}