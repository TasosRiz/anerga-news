<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\MediaFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

// Διαχειρίζεται τη βιβλιοθήκη πολυμέσων.
//
// Περιλαμβάνει:
// - προβολή media
// - upload εικόνας
// - διαγραφή εικόνας
// - μετακίνηση εικόνας σε folder

class MediaController extends Controller
{
    // Επιστρέφει όλα τα media αρχεία.
    public function index(Request $request)
    {
       if (!in_array($request->user()->role, ['admin', 'user'])) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $media = Media::with('folder')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'data' => $media,
        ], 200);
    }

    // Ανεβάζει νέα εικόνα στη Media Library.
    public function store(Request $request)
    {
        if (!in_array($request->user()->role, ['admin', 'user'])) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'image' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,gif,webp',
                'max:5120',
            ],
            'custom_name' => 'nullable|string|max:255',
            'media_folder_id' => 'nullable|exists:media_folders,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();
        $image = $request->file('image');
        $extension = strtolower($image->getClientOriginalExtension());

        // Δημιουργεί τον φάκελο αν δεν υπάρχει.
        $uploadDirectory = public_path('uploads/media');

        if (!File::isDirectory($uploadDirectory)) {
            File::makeDirectory(
                $uploadDirectory,
                0755,
                true
            );
        }

        // Δημιουργεί ασφαλές και μοναδικό filename.
        if (!empty($data['custom_name'])) {
            $baseName = Str::slug($data['custom_name']);
        } else {
            $originalName = pathinfo(
                $image->getClientOriginalName(),
                PATHINFO_FILENAME
            );

            $baseName = Str::slug($originalName);
        }

        if ($baseName === '') {
            $baseName = 'image';
        }

        $imageName = now()->format('YmdHis')
            . '-'
            . Str::random(8)
            . '-'
            . $baseName
            . '.'
            . $extension;

        // Αποθηκεύει την εικόνα στο public/uploads/media.
        $image->move(
            $uploadDirectory,
            $imageName
        );

        $mediaFolderId = $data['media_folder_id'] ?? null;

        // Χρησιμοποιεί το General folder όταν δεν έχει επιλεγεί folder.
        if ($mediaFolderId === null) {
            $mediaFolderId = MediaFolder::where(
                'slug',
                'general'
            )->value('id');
        }

        $media = Media::create([
            'media_folder_id' => $mediaFolderId,
            'file_name' => $imageName,
            'path' => 'uploads/media/' . $imageName,
        ]);

        return response()->json([
            'message' => 'Media uploaded successfully.',
            'data' => $media->load('folder'),
        ], 201);
    }

    // Διαγράφει εικόνα από τη Media Library.
    public function destroy(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $media = Media::find($id);

        if ($media === null) {
            return response()->json([
                'message' => 'Media not found.',
            ], 404);
        }

        // Εδώ μπορεί αργότερα να προστεθεί έλεγχος
        // αν το media χρησιμοποιείται από post, report ή organization info.

        $filePath = public_path($media->path);

        if (File::exists($filePath)) {
            File::delete($filePath);
        }

        $media->delete();

        return response()->json([
            'message' => 'Media deleted successfully.',
        ], 200);
    }

    // Μετακινεί εικόνα σε διαφορετικό folder.
    public function move(Request $request, int $id)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'media_folder_id' => 'required|exists:media_folders,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $media = Media::find($id);

        if ($media === null) {
            return response()->json([
                'message' => 'Media not found.',
            ], 404);
        }

        $data = $validator->validated();

        $media->update([
            'media_folder_id' => $data['media_folder_id'],
        ]);

        return response()->json([
            'message' => 'Media moved successfully.',
            'data' => $media->load('folder'),
        ], 200);
    }
}