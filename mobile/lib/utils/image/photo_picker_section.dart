import 'dart:io';

import 'package:flutter/material.dart';

class PhotoPickerSection extends StatelessWidget {
  const PhotoPickerSection({
    super.key,
    this.selectedPhoto,
    required this.onPickPhoto,
    required this.onRemovePhoto,
    this.title = 'Φωτογραφία',
    this.existingPhotoUrl,
  });

  final File? selectedPhoto;
  final String? existingPhotoUrl;
  final VoidCallback onPickPhoto;
  final VoidCallback onRemovePhoto;
  final String title;

  bool get hasExistingPhoto =>
      existingPhotoUrl != null && existingPhotoUrl!.isNotEmpty;

  bool get hasPhoto => selectedPhoto != null || hasExistingPhoto;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        _addPhotoSection(),
        if (hasPhoto) _removePhotoSection(),
      ],
    );
  }

  //Add Photo
  Widget _addPhotoSection() {
    return GestureDetector(
      onTap: onPickPhoto,
      child: Container(
        width: double.infinity,
        height: 160,
        decoration: BoxDecoration(
          color: Colors.grey.shade100,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey.shade300),
        ),
        child: selectedPhoto != null
            ? _localImage()
            : hasExistingPhoto
            ? _networkImage()
            : _emptyState(),
      ),
    );
  }

  Widget _localImage() {
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: Image.file(
        selectedPhoto!,
        width: double.infinity,
        height: 160,
        fit: BoxFit.cover,
      ),
    );
  }

  Widget _networkImage() {
    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: Image.network(
        existingPhotoUrl!,
        width: double.infinity,
        height: 160,

        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          return const Center(
            child: Text('Δεν ήταν δυνατή η φόρτωση της φωτογραφίας'),
          );
        },
      ),
    );
  }

  Widget _emptyState() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: const [
        Icon(Icons.add_photo_alternate, size: 42),
        SizedBox(height: 8),
        Text(
          'Πρόσθεσε φωτογραφία',
          style: TextStyle(fontWeight: FontWeight.w600),
        ),
      ],
    );
  }

  //Remove Photo
  Widget _removePhotoSection() {
    return TextButton.icon(
      onPressed: onRemovePhoto,
      label: const Text(
        'Αφαίρεση φωτογραφίας',
        style: TextStyle(color: Colors.red),
      ),
      icon: const Icon(Icons.delete, color: Colors.red),
    );
  }
}
