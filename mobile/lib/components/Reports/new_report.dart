import 'dart:io';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// API-Categories
import 'package:service_management_mobile/components/Categories/model/categories_api.dart';
import 'package:service_management_mobile/components/Categories/model/category_model.dart';

// Map
import 'package:service_management_mobile/components/Map/address_geocoding_helper.dart';

// Form-Reports
import 'package:service_management_mobile/components/Reports/Forms/report_form.dart';

// Providers
import 'package:service_management_mobile/components/Reports/provider/reports_provider.dart';

// Config
import 'package:service_management_mobile/utils/config.dart';

// Image
import 'package:service_management_mobile/utils/image/image_picker_helper.dart';

// Σελίδα δημιουργίας νέας αιτήματος.
//
// Αναλαμβάνει:
// - φόρτωση κατηγοριών
// - συμπλήρωση τίτλου και περιγραφής
// - συμπλήρωση διεύθυνσης
// - αναζήτηση τοποθεσίας στον χάρτη
// - επιλογή φωτογραφίας
// - validation των πεδίων
// - δημιουργία report μέσω του ReportsProvider
// - εμφάνιση loading και error messages

class NewReport extends StatefulWidget {
  const NewReport({super.key});

  @override
  State<NewReport> createState() => _NewReportState();
}

class _NewReportState extends State<NewReport> {
  // Κατηγορίες αιτημάτων.
  List<CategoryModel> categories = [];
  int? selectedCategoryId;

  // Κατάσταση φόρτωσης κατηγοριών.
  bool isLoading = true;
  String errorMessage = '';

  // Επιλεγμένη τοποθεσία.
  double? selectedLat;
  double? selectedLng;

  // Controllers βασικών πεδίων.
  final titleController = TextEditingController();
  final descController = TextEditingController();

  // Controllers διεύθυνσης.
  final addressController = TextEditingController();
  final cityController = TextEditingController();
  final postalCodeController = TextEditingController();

  // Επιλεγμένη φωτογραφία.
  File? selectedPhoto;

  // Κατάσταση αποθήκευσης.
  bool isSaving = false;

  @override
  void initState() {
    super.initState();

    // Φορτώνει τις κατηγορίες κατά το άνοιγμα της σελίδας.
    loadCategories();
  }

  @override
  void dispose() {
    // Καθαρίζει όλους τους controllers.
    titleController.dispose();
    descController.dispose();
    addressController.dispose();
    cityController.dispose();
    postalCodeController.dispose();

    super.dispose();
  }

  // Φορτώνει τις διαθέσιμες κατηγορίες από το API.
  Future<void> loadCategories() async {
    try {
      final data = await CategoriesApi.fetchCategories();

      if (!mounted) {
        return;
      }

      setState(() {
        categories = data;
      });
    } catch (error) {
      if (!mounted) {
        return;
      }

      setState(() {
        errorMessage = _cleanError(error);
      });
    } finally {
      if (!mounted) {
        return;
      }

      setState(() {
        isLoading = false;
      });
    }
  }

  // Αναζητά τη διεύθυνση και ενημερώνει τις συντεταγμένες.
  Future<void> searchAddressOnMap() async {
    try {
      final result = await AddressGeocodingHelper.searchAddress(
        address: addressController.text.trim(),
        city: cityController.text.trim(),
        postalCode: postalCodeController.text.trim(),
      );

      if (!mounted) {
        return;
      }

      setState(() {
        selectedLat = result.lat;
        selectedLng = result.lng;
      });
    } catch (error) {
      if (!mounted) {
        return;
      }

      _showMessage(_cleanError(error));
    }
  }

  // Επιλέγει φωτογραφία από τη συλλογή.
  Future<void> pickPhoto() async {
    final photo = await ImagePickerHelper.pickImageFromGallery();

    if (photo == null || !mounted) {
      return;
    }

    setState(() {
      selectedPhoto = photo;
    });
  }

  // Ελέγχει τα πεδία και δημιουργεί νέα αίτημα.
  Future<void> _createReport() async {
    final title = titleController.text.trim();
    final description = descController.text.trim();

    final address = addressController.text.trim();
    final city = cityController.text.trim();
    final postalCode = postalCodeController.text.trim();

    if (selectedCategoryId == null) {
      _showMessage('Επίλεξε κατηγορία.');
      return;
    }

    if (title.isEmpty) {
      _showMessage('Συμπλήρωσε τίτλο.');
      return;
    }

    if (description.isEmpty) {
      _showMessage('Συμπλήρωσε περιγραφή.');
      return;
    }

    if (address.isEmpty || city.isEmpty || postalCode.isEmpty) {
      _showMessage('Συμπλήρωσε τη διεύθυνση.');
      return;
    }

    if (selectedLat == null || selectedLng == null) {
      _showMessage('Επίλεξε τοποθεσία.');
      return;
    }

    setState(() {
      isSaving = true;
    });

    final reportsProvider = context.read<ReportsProvider>();

    final success = await reportsProvider.createReport(
      title: title,
      description: description,
      address: address,
      city: city,
      postalCode: postalCode,
      categoryId: selectedCategoryId!,
      lat: selectedLat!.toString(),
      lng: selectedLng!.toString(),
      photo: selectedPhoto,
    );

    if (!mounted) {
      return;
    }

    setState(() {
      isSaving = false;
    });

    if (!success) {
      _showMessage(reportsProvider.errorMessage);
      return;
    }

    _showMessage('Η αίτημα δημιουργήθηκε επιτυχώς.');

    Navigator.pop(context, true);
  }

  // Εμφανίζει SnackBar.
  void _showMessage(String message) {
    ScaffoldMessenger.of(context).clearSnackBars();

    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text(message)));
  }

  // Καθαρίζει το μήνυμα Exception.
  String _cleanError(Object error) {
    return error.toString().replaceFirst('Exception: ', '');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Νέα Αίτημα'),
        backgroundColor: Config.primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(15),
        child: ReportForm(
          categories: categories,
          isLoading: isLoading,
          errorMessage: errorMessage,

          selectedCategoryId: selectedCategoryId,
          onCategoryChanged: (value) {
            setState(() {
              selectedCategoryId = value;
            });
          },

          titleController: titleController,
          descController: descController,

          addressController: addressController,
          cityController: cityController,
          postalCodeController: postalCodeController,

          onAddressSearch: searchAddressOnMap,
          selectedLat: selectedLat,
          selectedLng: selectedLng,
          onLocationSelected: (lat, lng) {
            setState(() {
              selectedLat = lat;
              selectedLng = lng;
            });
          },

          selectedPhoto: selectedPhoto,
          onPickPhoto: pickPhoto,
          onRemovePhoto: () {
            setState(() {
              selectedPhoto = null;
            });
          },

          isSaving: isSaving,
          buttonText: 'Δημιουργία Αιτήματος',
          onSubmit: _createReport,
        ),
      ),
    );
  }
}
