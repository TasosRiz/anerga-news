import 'dart:convert';
import 'package:http/http.dart' as http;

// Config
import 'package:service_management_mobile/api/api_config.dart';

// API
import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';
import 'package:service_management_mobile/components/Categories/model/category_model.dart';

// Διαχειρίζεται την επικοινωνία με το backend
// για τη φόρτωση των κατηγοριών.
//
// Επιστρέφει λίστα από CategoryModel.

class CategoriesApi {
  // Φορτώνει όλες τις διαθέσιμες κατηγορίες.
  static Future<List<CategoryModel>> fetchCategories() async {
    final token = await AuthStorage.token();

    if (token == null || token.isEmpty) {
      throw Exception('Δεν βρέθηκε token σύνδεσης.');
    }

    final response = await http.get(
      Uri.parse('${ApiConfig.apiUrl}/categories'),
      headers: {'Accept': 'application/json', 'Authorization': 'Bearer $token'},
    );

    final body = _decodeResponse(response.body);

    if (response.statusCode == 200 && body['data'] is List) {
      final categoriesJson = body['data'] as List;

      return categoriesJson.map((item) {
        return CategoryModel.fromJson(Map<String, dynamic>.from(item as Map));
      }).toList();
    }

    throw Exception(
      body['message']?.toString() ?? 'Αποτυχία φόρτωσης κατηγοριών.',
    );
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
}
