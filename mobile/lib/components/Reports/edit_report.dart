import 'dart:io';
import 'package:flutter/material.dart';

// Widgets
import 'package:service_management_mobile/components/Map/address_geocoding_helper.dart';

// Config
import 'package:service_management_mobile/utils/config.dart';

// Categories
import 'package:service_management_mobile/components/Categories/model/categories_api.dart';
import 'package:service_management_mobile/components/Categories/model/category_model.dart';
import 'package:service_management_mobile/components/Reports/Forms/report_form.dart';

// API
import 'package:service_management_mobile/api/api_config.dart';
import 'package:service_management_mobile/components/Reports/api/reports_api.dart';
import 'package:service_management_mobile/components/Reports/model/report_model.dart';

// Helpers
import 'package:service_management_mobile/utils/image/image_picker_helper.dart'; //Image

// Επεξεργάζεται μία υπάρχουσα αίτημα.
//
// Περιλαμβάνει:
// - αρχικές τιμές αιτήματος
// - αλλαγή κατηγορίας
// - αλλαγή τίτλου και περιγραφής
// - αλλαγή διεύθυνσης και τοποθεσίας
// - αλλαγή ή αφαίρεση φωτογραφίας
// - αποθήκευση αλλαγών

class EditReport extends StatefulWidget {
  const EditReport({super.key, required this.report});

  final ReportModel report;

  @override
  State<EditReport> createState() => _EditReportState();
}

class _EditReportState extends State<EditReport> {
  //Pairnw categories apo categoryModel
  List<CategoryModel> categories = [];
  String errorMessage = '';
  bool isLoading = true;

  // Form values
  int? selectedCategoryId;
  final TextEditingController titleController = TextEditingController();
  final TextEditingController descController = TextEditingController();

  // Address
  final TextEditingController addressController = TextEditingController();
  final TextEditingController cityController = TextEditingController();
  final TextEditingController postalCodeController = TextEditingController();

  //Map
  double? selectedLat;
  double? selectedLng;

  //Save Changes
  bool isSaving = false;

  //Photo
  File? selectedPhoto;
  bool removeExistingPhoto = false;

  // Δημιουργεί το URL της υπάρχουσας φωτογραφίας.
  String? get existingPhotoUrl {
    if (removeExistingPhoto) return null;
    if (widget.report.photo.isEmpty) return null;

    return widget.report.photo.startsWith('http')
        ? widget.report.photo
        : '${ApiConfig.baseUrl}/${widget.report.photo}';
  }

  @override
  void initState() {
    super.initState();
    //Arxikes Times
    selectedCategoryId = widget.report.categoryId;
    titleController.text = widget.report.title;
    descController.text = widget.report.description;

    // Address
    addressController.text = widget.report.address ?? '';
    cityController.text = widget.report.city ?? '';
    postalCodeController.text = widget.report.postalCode ?? '';

    //Map
    selectedLat = double.tryParse(widget.report.lat);
    selectedLng = double.tryParse(widget.report.lng);

    loadCategories();
  }

  @override
  void dispose() {
    titleController.dispose();
    descController.dispose();

    //Address
    addressController.dispose();
    cityController.dispose();
    postalCodeController.dispose();

    super.dispose();
  }

  //Load Categories
  // Φορτώνει τις διαθέσιμες κατηγορίες.
  Future<void> loadCategories() async {
    try {
      final data = await CategoriesApi.fetchCategories();

      if (!mounted) return;

      setState(() {
        categories = data;
      });
    } catch (e) {
      if (!mounted) return;

      setState(() {
        errorMessage = e.toString().replaceFirst('Exception: ', '');
      });
    } finally {
      if (!mounted) return;

      setState(() {
        isLoading = false;
      });
    }
  }

  // Save all Changes
  // Ελέγχει τα πεδία και αποθηκεύει τις αλλαγές.
  Future<void> _saveReport() async {
    // title-Desc
    final title = titleController.text.trim();
    final description = descController.text.trim();

    if (title.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Συμπλήρωσε τίτλο')));
      return;
    }

    if (description.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Συμπλήρωσε περιγραφή')));
      return;
    }

    // Address
    final address = addressController.text.trim();
    final city = cityController.text.trim();
    final postalCode = postalCodeController.text.trim();

    if (address.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Συμπλήρωσε διεύθυνση')));
      return;
    }

    if (city.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Συμπλήρωσε πόλη')));
      return;
    }

    if (postalCode.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Συμπλήρωσε Τ.Κ.')));
      return;
    }

    // Category
    if (selectedCategoryId == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Επίλεξε κατηγορία')));
      return;
    }

    // Location
    if (selectedLat == null || selectedLng == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Επίλεξε τοποθεσία')));
      return;
    }

    setState(() {
      isSaving = true;
    });

    try {
      await ReportsApi.updateReport(
        reportId: widget.report.id,
        title: title,
        description: description,

        // Address
        address: address,
        city: city,
        postalCode: postalCode,

        categoryId: selectedCategoryId!,
        lat: selectedLat!.toString(),
        lng: selectedLng!.toString(),
        status: widget.report.status,
        photo: selectedPhoto,
        removePhoto: removeExistingPhoto,
      );

      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Η αίτημα ενημερώθηκε επιτυχώς')),
      );

      Navigator.pop(context, true);
    } catch (e) {
      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().replaceFirst('Exception: ', ''))),
      );
    } finally {
      if (!mounted) return;

      setState(() {
        isSaving = false;
      });
    }
  }

  // Επιλέγει νέα φωτογραφία από τη συλλογή.
  Future<void> pickPhoto() async {
    final photo = await ImagePickerHelper.pickImageFromGallery();

    if (photo == null || !mounted) {
      return;
    }

    setState(() {
      selectedPhoto = photo;
      removeExistingPhoto = false;
    });
  }

  // Location - Search Address
  // Αναζητά τη διεύθυνση και ενημερώνει τον χάρτη.
  Future<void> searchAddressOnMap() async {
    try {
      final result = await AddressGeocodingHelper.searchAddress(
        address: addressController.text,
        city: cityController.text,
        postalCode: postalCodeController.text,
      );

      if (!mounted) return;

      setState(() {
        selectedLat = result.lat;
        selectedLng = result.lng;
      });
    } catch (e) {
      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().replaceFirst('Exception: ', ''))),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Επεξεργασία Αιτήματος'),
        backgroundColor: Config.primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
        child: SingleChildScrollView(
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

            // Address
            addressController: addressController,
            cityController: cityController,
            postalCodeController: postalCodeController,

            //

            // Map
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
            existingPhotoUrl: existingPhotoUrl,
            onPickPhoto: pickPhoto,
            onRemovePhoto: () {
              setState(() {
                selectedPhoto = null;
                removeExistingPhoto = true;
              });
            },

            isSaving: isSaving,
            buttonText: 'Αποθήκευση',
            onSubmit: _saveReport,
          ),
        ),
      ),
    );
  }
}
