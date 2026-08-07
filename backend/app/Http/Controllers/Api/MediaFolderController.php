<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MediaFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

// Διαχειρίζεται τους φακέλους της Media Library.
//
// Περιλαμβάνει:
// - προβολή φακέλων
// - δημιουργία φακέλου
// - ενημέρωση φακέλου
// - διαγραφή φακέλου
// - media count ανά φάκελο

class MediaFolderController extends Controller
{
    // Επιστρέφει όλους τους φακέλους με το media count.
    public function index(Request $request)
    {
        if (!in_array($request->user()->role, ['admin', 'user'])) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $folders = MediaFolder::withCount('media')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $folders,
        ], 200);
    }

    // Δημιουργεί νέο media folder.
    public function store(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:media_folders,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $folder = MediaFolder::create([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
        ]);

        return response()->json([
            'message' => 'Media folder created successfully.',
            'data' => $folder,
        ], 201);
    }

    // Ενημερώνει έναν media folder.
    public function update(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $folder = MediaFolder::find($id);

        if ($folder === null) {
            return response()->json([
                'message' => 'Media folder not found.',
            ], 404);
        }

        // Προστατεύει τον default General folder.
        if ($folder->slug === 'general') {
            return response()->json([
                'message' => 'The General folder cannot be renamed.',
            ], 409);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:media_folders,name,' . $folder->id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $folder->update([
            'name' => $data['name'],
            'slug' => Str::slug($data['name']),
        ]);

        return response()->json([
            'message' => 'Media folder updated successfully.',
            'data' => $folder,
        ], 200);
    }

    // Διαγράφει έναν κενό media folder.
    public function destroy(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $folder = MediaFolder::withCount('media')->find($id);

        if ($folder === null) {
            return response()->json([
                'message' => 'Media folder not found.',
            ], 404);
        }

        // Προστατεύει τον default General folder.
        if ($folder->slug === 'general') {
            return response()->json([
                'message' => 'The General folder cannot be deleted.',
            ], 409);
        }

        if ($folder->media_count > 0) {
            return response()->json([
                'message' => 'Cannot delete folder because it contains media.',
            ], 409);
        }

        $folder->delete();

        return response()->json([
            'message' => 'Media folder deleted successfully.',
        ], 200);
    }
}