import 'dart:io';

// Περιέχει τα βασικά URLs του backend.
//
// Χρησιμοποιεί:
// - το local IP του υπολογιστή για πραγματική Android συσκευή
// - το 10.0.2.2 για Android emulator
// - το 127.0.0.1 για desktop ή iOS simulator
//
// Το Laravel πρέπει να τρέχει με:
// php artisan serve --host=0.0.0.0 --port=8000

class ApiConfig {
  static String get baseUrl {
    if (Platform.isAndroid) {
      // Android emulator:
      // return 'http://10.0.2.2:8000';

      // Πραγματική Android συσκευή.
      // Το IP αλλάζει ανάλογα με το δίκτυο και τον υπολογιστή.
      return 'http://192.168.1.61:8000';
    }

    // Desktop ή iOS simulator.
    return 'http://127.0.0.1:8000';
  }

  // Βασικό URL για τα API endpoints.
  static String get apiUrl => '$baseUrl/api';
}
