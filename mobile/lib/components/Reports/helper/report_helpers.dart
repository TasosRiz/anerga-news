import 'package:service_management_mobile/utils/config.dart';
import 'package:flutter/material.dart';

// Περιλαμβάνει βοηθητικές συναρτήσεις για τις αιτήματα.
//
// Αναλαμβάνει:
// - μετάφραση του status
// - επιλογή χρώματος ανά status
// - μορφοποίηση της ημερομηνίας

// Μετατρέπει το status σε ελληνικό κείμενο.
String formatStatus(String status) {
  switch (status) {
    case 'new':
      return 'Νέα';

    case 'in_progress':
      return 'Σε εξέλιξη';

    case 'resolved':
      return 'Ολοκληρωμένη';

    default:
      return status;
  }
}

// Επιστρέφει το αντίστοιχο χρώμα για κάθε status.
Color statusColor(String status) {
  switch (status) {
    case 'new':
      return Colors.blue;

    case 'in_progress':
      return Config.warning;

    case 'resolved':
      return Colors.purple;

    default:
      return Config.cityMuted;
  }
}

// Μετατρέπει την ημερομηνία από ISO μορφή σε ημέρα/μήνα/έτος.
String formatDate(String isoDate) {
  try {
    final date = DateTime.parse(isoDate);

    return '${date.day}/${date.month}/${date.year}';
  } catch (_) {
    // Επιστρέφει την αρχική τιμή αν η ημερομηνία δεν είναι έγκυρη.
    return isoDate;
  }
}
