<?php
namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

// Διαχειρίζεται τις κατηγορίες αιτημάτων.
//
// Περιλαμβάνει:
// - προβολή κατηγοριών
// - δημιουργία κατηγορίας
// - προβολή κατηγορίας
// - ενημέρωση κατηγορίας
// - διαγραφή κατηγορίας


class CategoryController extends Controller
{
    // Επιστρέφει όλες τις κατηγορίες.
    public function index()
    {
        $categories = Category::orderByDesc('created_at')->get();

        return response()->json([
            'data' => $categories,
        ], 200);
    }

    // Δημιουργεί νέα κατηγορία.
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories,name',
            'status' => 'required|in:0,1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $category = Category::create(
            $validator->validated()
        );

        return response()->json([
            'message' => 'Category added successfully.',
            'data' => $category,
        ], 201);
    }

    // Επιστρέφει μία συγκεκριμένη κατηγορία.
    public function show(int $id)
    {
        $category = Category::find($id);

        if ($category === null) {
            return response()->json([
                'message' => 'Category not found.',
            ], 404);
        }

        return response()->json([
            'data' => $category,
        ], 200);
    }

    // Ενημερώνει μία υπάρχουσα κατηγορία.
    public function update(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $category = Category::find($id);

        if ($category === null) {
            return response()->json([
                'message' => 'Category not found.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
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
            'message' => 'Category updated successfully.',
            'data' => $category,
        ], 200);
    }

    // Διαγράφει μία κατηγορία.
    public function destroy(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $category = Category::find($id);

        if ($category === null) {
            return response()->json([
                'message' => 'Category not found.',
            ], 404);
        }

        // Δεν επιτρέπει διαγραφή κατηγορίας που χρησιμοποιείται.
        if ($category->reports()->exists()) {
            return response()->json([
                'message' => 'Η κατηγορία χρησιμοποιείται από αιτήματα και δεν μπορεί να διαγραφεί.',
            ], 409);
        }

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully.',
        ], 200);
    }
}