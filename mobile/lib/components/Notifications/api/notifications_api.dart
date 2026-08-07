import 'dart:convert';
import 'package:service_management_mobile/components/Notifications/model/NotificationModel.dart';
import 'package:http/http.dart' as http;

// API
import 'package:service_management_mobile/api/api_config.dart';
import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';

// Model

// Διαχειρίζεται την επικοινωνία με το backend
// για τις ειδοποιήσεις του χρήστη.
//
// Περιλαμβάνει:
// - φόρτωση ειδοποιήσεων
// - φόρτωση unread count
// - mark notification as read
// - mark all notifications as read
//
// Δεν κρατά UI state, loading ή navigation.

class NotificationsApi {
  // Φορτώνει τις ειδοποιήσεις του συνδεδεμένου χρήστη.
  static Future<List<Notificationmodel>> fetchNotifications() async {
    final token = await AuthStorage.token();

    final response = await http.get(
      Uri.parse('${ApiConfig.apiUrl}/user/notifications'),
      headers: {'Accept': 'application/json', 'Authorization': 'Bearer $token'},
    );

    final body = jsonDecode(response.body);

    if (response.statusCode == 200 && body['data'] is List) {
      final List notificationsJson = body['data'];

      return notificationsJson.map((item) {
        return Notificationmodel.fromJson(item);
      }).toList();
    }

    throw Exception(body['message'] ?? 'Αποτυχία φόρτωσης ειδοποιήσεων');
  }

  // Φορτώνει το πλήθος των μη διαβασμένων ειδοποιήσεων.
  static Future<int> fetchUnreadCount() async {
    final token = await AuthStorage.token();

    final response = await http.get(
      Uri.parse('${ApiConfig.apiUrl}/user/notifications/unread-count'),
      headers: {'Accept': 'application/json', 'Authorization': 'Bearer $token'},
    );

    final body = jsonDecode(response.body);

    if (response.statusCode == 200) {
      return body['count'] ?? 0;
    }

    throw Exception(body['message'] ?? 'Αποτυχία φόρτωσης unread count');
  }

  // Μαρκάρει μία ειδοποίηση ως διαβασμένη.
  static Future<void> markAsRead(int notificationId) async {
    final token = await AuthStorage.token();

    final response = await http.put(
      Uri.parse('${ApiConfig.apiUrl}/user/notifications/$notificationId/read'),
      headers: {'Accept': 'application/json', 'Authorization': 'Bearer $token'},
    );

    final body = jsonDecode(response.body);

    if (response.statusCode != 200) {
      throw Exception(body['message'] ?? 'Αποτυχία ενημέρωσης ειδοποίησης');
    }
  }

  // Μαρκάρει όλες τις ειδοποιήσεις ως διαβασμένες.
  static Future<void> markAllAsRead() async {
    final token = await AuthStorage.token();

    final response = await http.put(
      Uri.parse('${ApiConfig.apiUrl}/user/notifications/read-all'),
      headers: {'Accept': 'application/json', 'Authorization': 'Bearer $token'},
    );

    final body = jsonDecode(response.body);

    if (response.statusCode != 200) {
      throw Exception(body['message'] ?? 'Αποτυχία ενημέρωσης ειδοποιήσεων');
    }
  }
}
