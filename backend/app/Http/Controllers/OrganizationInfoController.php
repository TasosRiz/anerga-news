<?php
namespace App\Http\Controllers;

use App\Models\OrganizationInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

// Διαχειρίζεται τα βασικά στοιχεία του οργανισμού.
//
// Περιλαμβάνει:
// - όνομα εφαρμογής
// - όνομα οργανισμού
// - πόλη
// - στοιχεία επικοινωνίας
// - χρώματα εφαρμογής
// - logo

class OrganizationInfoController extends Controller
{
    // Επιστρέφει ή δημιουργεί τα βασικά στοιχεία του οργανισμού.
    private function getInfo(): OrganizationInfo
    {
        return OrganizationInfo::firstOrCreate(
            ['id' => 1],
            [
                'app_name' => 'ServiceKit',
                'organization_name' => 'Your Organization',
                'city' => 'Your City',
                'email' => 'hello@example.com',
                'phone' => '+00 000 000 0000',
                'address' => 'Your Address',
                'primary_color' => '#526d82',
                'secondary_color' => '#e86f2f',
                'logo' => null,
            ]
        );
    }

    // Επιστρέφει τα στοιχεία του οργανισμού.
    public function show()
    {
        return response()->json([
            'data' => $this->getInfo(),
        ], 200);
    }

    // Ενημερώνει τα στοιχεία του οργανισμού.
    public function update(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'app_name' => 'required|string|max:255',
            'organization_name' => 'required|string|max:255',
            'city' => 'required|string|max:255',

            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',

            'primary_color' => [
                'required',
                'regex:/^#[0-9A-Fa-f]{6}$/',
            ],
            'secondary_color' => [
                'required',
                'regex:/^#[0-9A-Fa-f]{6}$/',
            ],

            // Path ή URL του logo.
            'logo' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $info = $this->getInfo();

        // Ενημερώνει μόνο με validated δεδομένα.
        $info->update(
            $validator->validated()
        );

        return response()->json([
            'message' => 'Organization info updated successfully.',
            'data' => $info,
        ], 200);
    }
}