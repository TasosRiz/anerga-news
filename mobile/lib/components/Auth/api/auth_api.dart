import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';
import 'package:service_management_mobile/api/api_config.dart';

//  Διαχειρίζεται τα authentication requests προς το API.

//  Περιλαμβάνει:
//  - login
//  - register
//  - φόρτωση χρήστη
//  - logout
//  - αποθήκευση authentication δεδομένων

class AuthApi {
  AuthApi()
    : _dio = Dio(
        BaseOptions(
          baseUrl: ApiConfig.apiUrl,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        ),
      );

  final Dio _dio;

  // Σύνδεση χρήστη και αποθήκευση των authentication δεδομένων.
  Future<bool> getToken(String email, String password) async {
    try {
      final response = await _dio.post(
        '/login',
        data: {'email': email, 'password': password},
      );

      if (response.statusCode != 200 || response.data == null) {
        return false;
      }

      final data = Map<String, dynamic>.from(response.data as Map);

      final token = data['token']?.toString();

      if (token == null || token.isEmpty) {
        throw Exception('Δεν βρέθηκε token στην απάντηση του server.');
      }

      await AuthStorage.saveAuthInfo(data);

      return true;
    } catch (error) {
      debugPrint('LOGIN ERROR: $error');
      rethrow;
    }
  }

  // Φορτώνει τα στοιχεία του συνδεδεμένου χρήστη.
  Future<Map<String, dynamic>?> getUser(String token) async {
    try {
      final response = await _dio.get('/user', options: _authOptions(token));

      if (response.statusCode != 200 || response.data == null) {
        return null;
      }

      return Map<String, dynamic>.from(response.data as Map);
    } catch (error) {
      debugPrint('GET USER ERROR: $error');
      rethrow;
    }
  }

  // Δημιουργεί νέο λογαριασμό.
  Future<Map<String, dynamic>> registerUser({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      final response = await _dio.post(
        '/register',
        data: {'name': name, 'email': email, 'password': password},
      );

      if (response.statusCode != 200 && response.statusCode != 201) {
        throw Exception('Η εγγραφή απέτυχε.');
      }

      if (response.data is! Map) {
        throw Exception('Μη έγκυρη απάντηση από τον server.');
      }

      return Map<String, dynamic>.from(response.data as Map);
    } on DioException catch (error) {
      throw Exception(_extractDioError(error, fallback: 'Η εγγραφή απέτυχε.'));
    }
  }

  // Αποσυνδέει τον χρήστη και καθαρίζει τα τοπικά auth δεδομένα.
  Future<bool> logout(String token) async {
    try {
      final response = await _dio.post('/logout', options: _authOptions(token));

      final success = response.statusCode == 200 || response.statusCode == 204;

      if (success) {
        await AuthStorage.clearAuthInfo();
      }

      return success;
    } catch (error) {
      debugPrint('LOGOUT ERROR: $error');
      return false;
    }
  }

  // Δημιουργεί headers για authenticated requests.
  Options _authOptions(String token) {
    return Options(
      headers: {'Authorization': 'Bearer $token', 'Accept': 'application/json'},
    );
  }

  // Επιστρέφει καθαρό μήνυμα λάθους από Dio response.
  static String _extractDioError(
    DioException error, {
    required String fallback,
  }) {
    final data = error.response?.data;

    if (data is Map<String, dynamic>) {
      if (data['message'] is String) {
        return data['message'];
      }

      final errors = data['errors'];

      if (errors is Map<String, dynamic>) {
        for (final value in errors.values) {
          if (value is List && value.isNotEmpty) {
            return value.first.toString();
          }
        }
      }
    }

    return fallback;
  }
}
