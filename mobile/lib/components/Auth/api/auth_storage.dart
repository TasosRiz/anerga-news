import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

// Αποθηκεύει και διαβάζει τα authentication δεδομένα τοπικά.
//
// Περιλαμβάνει:
// - αποθήκευση login / register response
// - ανάκτηση token και στοιχείων χρήστη
// - έλεγχο σύνδεσης
// - καθαρισμό auth δεδομένων στο logout

class AuthStorage {
  static const String authInfoKey = 'authInfo';

  // Αποθηκεύει ολόκληρη την auth response.
  static Future<void> saveAuthInfo(Map<String, dynamic> data) async {
    final prefs = await SharedPreferences.getInstance();

    await prefs.setString(authInfoKey, jsonEncode(data));
  }

  // Διαβάζει με ασφάλεια τα αποθηκευμένα auth δεδομένα.
  static Future<Map<String, dynamic>?> authInfo() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final value = prefs.getString(authInfoKey);

      if (value == null || value.isEmpty) {
        return null;
      }

      final decoded = jsonDecode(value);

      if (decoded is! Map) {
        return null;
      }

      return Map<String, dynamic>.from(decoded);
    } catch (_) {
      return null;
    }
  }

  // Επιστρέφει το αποθηκευμένο access token.
  static Future<String?> token() async {
    final data = await authInfo();

    if (data == null) {
      return null;
    }

    final nestedData = data['data'];

    return data['token']?.toString() ??
        data['access_token']?.toString() ??
        (nestedData is Map
            ? nestedData['token']?.toString() ??
                  nestedData['access_token']?.toString()
            : null);
  }

  // Επιστρέφει τον ρόλο του χρήστη.
  static Future<String?> userType() async {
    final user = await _user();

    return user?['role']?.toString();
  }

  // Ελέγχει αν υπάρχει αποθηκευμένο token.
  static Future<bool> isLoggedIn() async {
    final tokenValue = await token();

    return tokenValue != null && tokenValue.isNotEmpty;
  }

  // Επιστρέφει το όνομα του χρήστη.
  static Future<String?> userName() async {
    final user = await _user();

    return user?['name']?.toString();
  }

  // Επιστρέφει το email του χρήστη.
  static Future<String?> userEmail() async {
    final user = await _user();

    return user?['email']?.toString();
  }

  // Επιστρέφει το id του χρήστη.
  static Future<int?> userId() async {
    final user = await _user();
    final id = user?['id'];

    if (id == null) {
      return null;
    }

    if (id is int) {
      return id;
    }

    return int.tryParse(id.toString());
  }

  // Διαβάζει το user object από τα auth δεδομένα.
  static Future<Map<String, dynamic>?> _user() async {
    final data = await authInfo();

    if (data == null) {
      return null;
    }

    final user = data['user'];

    if (user is Map) {
      return Map<String, dynamic>.from(user);
    }

    final nestedData = data['data'];

    if (nestedData is Map && nestedData['user'] is Map) {
      return Map<String, dynamic>.from(nestedData['user'] as Map);
    }

    return null;
  }

  // Διαγράφει όλα τα αποθηκευμένα auth δεδομένα.
  static Future<void> clearAuthInfo() async {
    final prefs = await SharedPreferences.getInstance();

    await prefs.remove(authInfoKey);
  }
}
