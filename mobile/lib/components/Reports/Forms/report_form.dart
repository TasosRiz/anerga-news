import 'dart:io';

import 'package:service_management_mobile/components/Categories/model/category_model.dart';
import 'package:service_management_mobile/components/Map/map_picker.dart';
import 'package:service_management_mobile/utils/Widgets/Cards/app_card.dart';
import 'package:service_management_mobile/utils/config.dart';
import 'package:service_management_mobile/utils/image/photo_picker_section.dart';
import 'package:flutter/material.dart';

// Κοινή φόρμα για δημιουργία και επεξεργασία αιτήματος.
//
// Περιλαμβάνει:
// - επιλογή φωτογραφίας
// - επιλογή κατηγορίας
// - τίτλο και περιγραφή
// - στοιχεία διεύθυνσης
// - αναζήτηση τοποθεσίας
// - επιλογή σημείου στον χάρτη
// - submit button
//
// Η λογική create ή update περνάει από το parent
// μέσω του onSubmit.

class ReportForm extends StatelessWidget {
  final List<CategoryModel> categories;
  final bool isLoading;
  final String errorMessage;

  final int? selectedCategoryId;
  final ValueChanged<int?> onCategoryChanged;

  final TextEditingController titleController;
  final TextEditingController descController;

  // Address
  final TextEditingController addressController;
  final TextEditingController cityController;
  final TextEditingController postalCodeController;

  // Map
  final VoidCallback onAddressSearch;
  final double? selectedLat;
  final double? selectedLng;
  final void Function(double lat, double lng) onLocationSelected;

  final File? selectedPhoto;
  final String? existingPhotoUrl;
  final VoidCallback onPickPhoto;
  final VoidCallback onRemovePhoto;

  final bool isSaving;
  final String buttonText;
  final VoidCallback onSubmit;

  const ReportForm({
    super.key,
    required this.categories,
    required this.isLoading,
    required this.errorMessage,
    required this.selectedCategoryId,
    required this.onCategoryChanged,
    required this.titleController,
    required this.descController,

    // Address
    required this.addressController,
    required this.cityController,
    required this.postalCodeController,

    // Map
    required this.onAddressSearch,
    required this.selectedLat,
    required this.selectedLng,
    required this.onLocationSelected,

    required this.selectedPhoto,
    this.existingPhotoUrl,
    required this.onPickPhoto,
    required this.onRemovePhoto,
    required this.isSaving,
    required this.buttonText,
    required this.onSubmit,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        AppCard(
          child: PhotoPickerSection(
            selectedPhoto: selectedPhoto,
            existingPhotoUrl: existingPhotoUrl,
            onPickPhoto: onPickPhoto,
            onRemovePhoto: onRemovePhoto,
          ),
        ),
        Config.spaceSmall,

        AppCard(child: _categorySection()),
        Config.spaceSmall,

        AppCard(child: _titleSection()),
        Config.spaceSmall,

        AppCard(child: _descSection()),
        Config.spaceSmall,

        AppCard(child: _addressSection()),
        Config.spaceSmall,

        AppCard(child: _locationSection()),
        Config.spaceSmall,

        _submitButton(),
      ],
    );
  }

  // Εμφανίζει την επιλογή κατηγορίας.
  Widget _categorySection() {
    if (isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (errorMessage.isNotEmpty) {
      return Text(errorMessage, style: const TextStyle(color: Colors.red));
    }

    if (categories.isEmpty) {
      return const Text('Δεν βρέθηκαν κατηγορίες');
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Κατηγορία',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,
        DropdownButtonFormField<int>(
          value: selectedCategoryId,
          isExpanded: true,
          decoration: InputDecoration(
            labelText: 'Επίλεξε κατηγορία',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(
                color: Config.primaryColor,
                width: 2,
              ),
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 14,
              vertical: 14,
            ),
          ),
          items: categories.map((category) {
            return DropdownMenuItem<int>(
              value: category.id,
              child: Text(category.name),
            );
          }).toList(),
          onChanged: onCategoryChanged,
        ),
      ],
    );
  }

  // Εμφανίζει τον τίτλο της αιτήματος.
  Widget _titleSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Τίτλος',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,
        TextFormField(
          controller: titleController,
          decoration: const InputDecoration(
            border: UnderlineInputBorder(),
            labelText: 'Τίτλος Αιτήματος',
          ),
        ),
      ],
    );
  }

  // Εμφανίζει την περιγραφή της αιτήματος.
  Widget _descSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Περιγραφή',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,
        TextFormField(
          controller: descController,
          maxLines: 5,
          minLines: 4,
          decoration: InputDecoration(
            labelText: 'Πληροφορίες Αιτήματος',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 16,
            ),
          ),
        ),
      ],
    );
  }

  // Εμφανίζει τα στοιχεία διεύθυνσης.
  Widget _addressSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Στοιχεία Διεύθυνσης',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,

        TextFormField(
          controller: addressController,
          decoration: InputDecoration(
            labelText: 'Οδός και αριθμός',
            hintText: 'π.χ. Σούτσου 6',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),

        Config.spaceSmall,

        TextFormField(
          controller: cityController,
          decoration: InputDecoration(
            labelText: 'Πόλη',
            hintText: 'π.χ. Your City',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),

        Config.spaceSmall,

        TextFormField(
          controller: postalCodeController,
          keyboardType: TextInputType.number,
          maxLength: 6,
          decoration: InputDecoration(
            labelText: 'Τ.Κ.',
            hintText: 'π.χ. 422 00',
            counterText: '',
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
          ),
        ),
        Config.spaceSmall,

        SizedBox(
          width: double.infinity,
          child: OutlinedButton.icon(
            onPressed: onAddressSearch,
            icon: const Icon(Icons.search),
            label: const Text('Εύρεση στον χάρτη'),
            style: OutlinedButton.styleFrom(
              foregroundColor: Config.primaryColor,
              padding: const EdgeInsets.symmetric(vertical: 13),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              side: const BorderSide(color: Config.primaryColor),
            ),
          ),
        ),
      ],
    );
  }

  // Εμφανίζει τον χάρτη και την επιλεγμένη τοποθεσία.
  Widget _locationSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Τοποθεσία',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        const Text('Πάτησε πάνω στον χάρτη για να επιλέξεις σημείο'),
        const SizedBox(height: 12),

        SizedBox(
          height: 300,
          width: double.infinity,
          child: MapPicker(
            lat: selectedLat,
            lng: selectedLng,
            onLocationSelected: onLocationSelected,
          ),
        ),

        const SizedBox(height: 12),

        if (selectedLat != null && selectedLng != null)
          Text(
            'Επιλεγμένη τοποθεσία: ${addressController.text}, ${cityController.text}',
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
          ),
      ],
    );
  }

  // Εμφανίζει το κουμπί αποθήκευσης.
  Widget _submitButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: isSaving ? null : onSubmit,
        style: ElevatedButton.styleFrom(
          backgroundColor: Config.primaryColor,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        child: isSaving
            ? const SizedBox(
                height: 22,
                width: 22,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  color: Colors.white,
                ),
              )
            : Text(
                buttonText,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
      ),
    );
  }
}
