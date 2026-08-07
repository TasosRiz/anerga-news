import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

// API
import 'package:service_management_mobile/api/api_config.dart';
import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';
import 'package:service_management_mobile/components/Reports/model/report_model.dart';

// Διαχειρίζεται μόνο την επικοινωνία με το backend.
//
// Αναλαμβάνει:
// - φόρτωση όλων των reports
// - φόρτωση των reports του χρήστη
// - δημιουργία report
// - ενημέρωση report
// - διαγραφή report
// - φόρτωση report counts
//
// Δεν διαχειρίζεται UI state, loading, SnackBars ή navigation.

class ReportsApi {
  // Φορτώνει όλες τις αιτήματα.
  static Future<List<ReportModel>> fetchReports() async {
    final response = await http.get(
      Uri.parse('${ApiConfig.apiUrl}/reports'),
      headers: await _authHeaders(),
    );

    final body = _decodeResponse(response.body);

    if (response.statusCode == 200 && body['data'] is List) {
      final reportsJson = body['data'] as List;

      return reportsJson
          .map(
            (item) =>
                ReportModel.fromJson(Map<String, dynamic>.from(item as Map)),
          )
          .toList();
    }

    throw Exception(
      _extractErrorMessage(body, fallback: 'Αποτυχία φόρτωσης αιτημάτων'),
    );
  }

  // Φορτώνει τις αιτήματα του συνδεδεμένου χρήστη.
  static Future<List<ReportModel>> fetchUserReports() async {
    final response = await http.get(
      Uri.parse('${ApiConfig.apiUrl}/user-reports'),
      headers: await _authHeaders(),
    );

    final body = _decodeResponse(response.body);

    if (response.statusCode == 200 && body['data'] is List) {
      final reportsJson = body['data'] as List;

      return reportsJson
          .map(
            (item) =>
                ReportModel.fromJson(Map<String, dynamic>.from(item as Map)),
          )
          .toList();
    }

    throw Exception(
      _extractErrorMessage(body, fallback: 'Αποτυχία φόρτωσης αιτημάτων χρήστη'),
    );
  }

  // Δημιουργεί νέα αίτημα.
  static Future<void> createReport({
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
    String? photoPath;

    // Ανεβάζει πρώτα τη φωτογραφία στη Media Library.
    if (photo != null) {
      photoPath = await _uploadReportPhoto(photo);
    }

    final response = await http.post(
      Uri.parse('${ApiConfig.apiUrl}/reports'),
      headers: {...await _authHeaders(), 'Content-Type': 'application/json'},
      body: jsonEncode({
        'title': title,
        'description': description,
        'address': address,
        'city': city,
        'postal_code': postalCode.replaceAll(' ', ''),
        'category_id': categoryId,
        'lat': lat,
        'lng': lng,
        'photo': photoPath,
      }),
    );

    if (response.statusCode != 200 && response.statusCode != 201) {
      final body = _decodeResponse(response.body);

      throw Exception(
        _extractErrorMessage(body, fallback: 'Αποτυχία δημιουργίας αιτήματος'),
      );
    }
  }

  static Future<String> _uploadReportPhoto(File photo) async {
    final request = http.MultipartRequest(
      'POST',
      Uri.parse('${ApiConfig.apiUrl}/media'),
    );

    request.headers.addAll(await _authHeaders());

    request.files.add(await http.MultipartFile.fromPath('image', photo.path));

    final streamedResponse = await request.send();
    final response = await http.Response.fromStream(streamedResponse);

    final body = _decodeResponse(response.body);

    if (response.statusCode != 201) {
      throw Exception(
        _extractErrorMessage(body, fallback: 'Αποτυχία upload φωτογραφίας'),
      );
    }

    final data = body['data'];

    if (data is! Map || data['path'] == null) {
      throw Exception('Δεν επιστράφηκε path φωτογραφίας.');
    }

    return data['path'].toString();
  }

  // Ενημερώνει υπάρχουσα αίτημα.
  static Future<void> updateReport({
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
    final request = http.MultipartRequest(
      'POST',
      Uri.parse('${ApiConfig.apiUrl}/reports/$reportId'),
    );

    request.headers.addAll(await _authHeaders());

    // Το Laravel δέχεται το request ως PUT μέσω method spoofing.
    request.fields.addAll({
      '_method': 'PUT',
      'title': title,
      'description': description,
      'address': address,
      'city': city,
      'postal_code': postalCode,
      'category_id': categoryId.toString(),
      'lat': lat,
      'lng': lng,
      'status': status,
      'remove_photo': removePhoto ? '1' : '0',
    });

    if (photo != null) {
      request.files.add(await http.MultipartFile.fromPath('photo', photo.path));
    }

    final streamedResponse = await request.send();
    final response = await http.Response.fromStream(streamedResponse);

    if (response.statusCode != 200) {
      final body = _decodeResponse(response.body);

      throw Exception(
        _extractErrorMessage(body, fallback: 'Αποτυχία ενημέρωσης αιτήματος'),
      );
    }
  }

  // Διαγράφει μία αίτημα.
  //
  // TODO:
  // Να αντικατασταθεί αργότερα με cancel ή soft delete,
  // ώστε η αίτημα να παραμένει ορατή στον admin.
  static Future<void> deleteReport({required int reportId}) async {
    final response = await http.delete(
      Uri.parse('${ApiConfig.apiUrl}/reports/$reportId'),
      headers: await _authHeaders(),
    );

    if (response.statusCode != 200 && response.statusCode != 204) {
      final body = _decodeResponse(response.body);

      throw Exception(
        _extractErrorMessage(body, fallback: 'Αποτυχία διαγραφής αιτήματος'),
      );
    }
  }

  // Φορτώνει τα report counts του χρήστη.
  static Future<ReportCountsModel> fetchUserReportCounts() async {
    final response = await http.get(
      Uri.parse('${ApiConfig.apiUrl}/dashboard/user-counts'),
      headers: await _authHeaders(),
    );

    final body = _decodeResponse(response.body);

    if (response.statusCode == 200) {
      return ReportCountsModel.fromJson(body);
    }

    throw Exception(
      _extractErrorMessage(
        body,
        fallback: 'Αποτυχία φόρτωσης σύνοψης αιτημάτων',
      ),
    );
  }

  // Δημιουργεί τα authenticated headers.
  static Future<Map<String, String>> _authHeaders() async {
    final token = await AuthStorage.token();

    if (token == null || token.isEmpty) {
      throw Exception('Δεν βρέθηκε token σύνδεσης.');
    }

    return {'Accept': 'application/json', 'Authorization': 'Bearer $token'};
  }

  // Μετατρέπει με ασφάλεια το response body σε Map.
  static Map<String, dynamic> _decodeResponse(String responseBody) {
    if (responseBody.isEmpty) {
      return {};
    }

    try {
      final decoded = jsonDecode(responseBody);

      if (decoded is Map) {
        return Map<String, dynamic>.from(decoded);
      }

      return {};
    } catch (_) {
      return {};
    }
  }

  // Επιστρέφει καθαρό μήνυμα λάθους από το API.
  static String _extractErrorMessage(
    Map<String, dynamic> body, {
    required String fallback,
  }) {
    if (body['message'] is String) {
      return body['message'];
    }

    final errors = body['errors'];

    if (errors is Map) {
      for (final value in errors.values) {
        if (value is List && value.isNotEmpty) {
          return value.first.toString();
        }

        if (value != null) {
          return value.toString();
        }
      }
    }

    return fallback;
  }
}
