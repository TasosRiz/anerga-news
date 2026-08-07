import 'dart:io';

// Κοινή βοηθητική κλάση για επιλογή εικόνας.
//
// Ανοίγει τη συλλογή της συσκευής,
// μειώνει την ποιότητα της εικόνας
// και επιστρέφει το επιλεγμένο αρχείο.

import 'package:image_picker/image_picker.dart';

class ImagePickerHelper {
  static final ImagePicker _picker = ImagePicker();

  // Επιλέγει εικόνα από τη συλλογή της συσκευής.
  static Future<File?> pickImageFromGallery() async {
    final pickedFile = await _picker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 75,
    );

    // Ο χρήστης έκλεισε τον picker χωρίς να επιλέξει εικόνα.
    if (pickedFile == null) {
      return null;
    }

    return File(pickedFile.path);
  }
}
