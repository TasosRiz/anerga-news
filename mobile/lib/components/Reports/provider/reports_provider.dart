import 'dart:io';

import 'package:flutter/foundation.dart';

import 'package:service_management_mobile/components/Reports/api/reports_api.dart';
import 'package:service_management_mobile/components/Reports/model/report_model.dart';

// Reports Provider
//
// Διαχειρίζεται την κατάσταση των αιτημάτων.
//
// Αναλαμβάνει:
// - φόρτωση όλων των reports
// - φόρτωση των reports του χρήστη
// - δημιουργία report
// - ενημέρωση report
// - διαγραφή report
// - φόρτωση των report counts
// - loading, saving και error states
//
// Με το notifyListeners() ενημερώνει το UI
// όταν αλλάζουν τα δεδομένα.

class ReportsProvider extends ChangeNotifier {
  // Λίστα αιτημάτων.
  List<ReportModel> reports = [];

  // Κατάσταση φόρτωσης και αποθήκευσης.
  bool loading = false;
  bool saving = false;

  // Μήνυμα λάθους των reports.
  String errorMessage = '';

  // Counts των reports.
  ReportCountsModel? counts;
  bool countsLoading = false;
  String countsErrorMessage = '';

  // Φορτώνει όλες τις αιτήματα.
  Future<void> fetchReports() async {
    loading = true;
    errorMessage = '';
    notifyListeners();

    try {
      reports = await ReportsApi.fetchReports();
    } catch (error) {
      errorMessage = _errorMessage(error);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  // Φορτώνει τις αιτήματα του συνδεδεμένου χρήστη.
  Future<void> fetchUserReports() async {
    loading = true;
    errorMessage = '';
    notifyListeners();

    try {
      reports = await ReportsApi.fetchUserReports();
    } catch (error) {
      errorMessage = _errorMessage(error);
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  // Δημιουργεί νέα αίτημα.
  Future<bool> createReport({
    required String title,
    required String description,
    required String address,
    required String city,
    required String postalCode,
    required int categoryId,
    required String lat,
    required String lng,
    File? photo,
  }) async {
    saving = true;
    errorMessage = '';
    notifyListeners();

    try {
      await ReportsApi.createReport(
        title: title,
        description: description,
        address: address,
        city: city,
        postalCode: postalCode,
        categoryId: categoryId,
        lat: lat,
        lng: lng,
        photo: photo,
      );

      // Ανανεώνει reports και counts μετά τη δημιουργία.
      await fetchUserReports();
      await loadUserReportCounts();

      return true;
    } catch (error) {
      errorMessage = _errorMessage(error);
      return false;
    } finally {
      saving = false;
      notifyListeners();
    }
  }

  // Ενημερώνει υπάρχουσα αίτημα.
  Future<bool> updateReport({
    required int reportId,
    required String title,
    required String description,
    required String address,
    required String city,
    required String postalCode,
    required int categoryId,
    required String lat,
    required String lng,
    required String status,
    File? photo,
    bool removePhoto = false,
  }) async {
    saving = true;
    errorMessage = '';
    notifyListeners();

    try {
      await ReportsApi.updateReport(
        reportId: reportId,
        title: title,
        description: description,
        address: address,
        city: city,
        postalCode: postalCode,
        categoryId: categoryId,
        lat: lat,
        lng: lng,
        status: status,
        photo: photo,
        removePhoto: removePhoto,
      );

      // Ανανεώνει reports και counts μετά την ενημέρωση.
      await fetchUserReports();
      await loadUserReportCounts();

      return true;
    } catch (error) {
      errorMessage = _errorMessage(error);
      return false;
    } finally {
      saving = false;
      notifyListeners();
    }
  }

  // Διαγράφει μία αίτημα.
  Future<bool> deleteReport(int reportId) async {
    errorMessage = '';

    try {
      await ReportsApi.deleteReport(reportId: reportId);

      // Αφαιρεί το report τοπικά από τη λίστα.
      reports.removeWhere((report) => report.id == reportId);

      // Ανανεώνει τα counts μετά τη διαγραφή.
      await loadUserReportCounts();

      notifyListeners();
      return true;
    } catch (error) {
      errorMessage = _errorMessage(error);
      notifyListeners();
      return false;
    }
  }

  // Φορτώνει τα report counts του χρήστη.
  Future<void> loadUserReportCounts() async {
    countsLoading = true;
    countsErrorMessage = '';
    notifyListeners();

    try {
      counts = await ReportsApi.fetchUserReportCounts();
    } catch (error) {
      countsErrorMessage = _errorMessage(error);
    } finally {
      countsLoading = false;
      notifyListeners();
    }
  }

  // Καθαρίζει το μήνυμα λάθους από Exception.
  String _errorMessage(Object error) {
    return error.toString().replaceFirst('Exception: ', '');
  }
}
