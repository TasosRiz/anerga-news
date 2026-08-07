import 'package:flutter/material.dart';

// Διαχειρίζεται:
// - το loading του authentication
// - τα error και success messages
// - την εμφάνιση SnackBar
// - τη μετατροπή των API errors σε κατανοητά μηνύματα

class AuthMsgProvider extends ChangeNotifier {
  bool isLoading = false;
  String? errorMessage;
  String? successMessage;

  // Ενεργοποιεί το loading και καθαρίζει τα παλιά μηνύματα.
  void startLoading() {
    isLoading = true;
    errorMessage = null;
    successMessage = null;

    notifyListeners();
  }

  // Απενεργοποιεί το loading.
  void stopLoading() {
    isLoading = false;

    notifyListeners();
  }

  // Αποθηκεύει και εμφανίζει μήνυμα λάθους.
  void showError(BuildContext context, String message) {
    setError(message);

    showSnackBar(context, message, backgroundColor: Colors.red);
  }

  // Αποθηκεύει μήνυμα λάθους.
  void setError(String message) {
    errorMessage = message;
    successMessage = null;
    isLoading = false;

    notifyListeners();
  }

  // Αποθηκεύει μήνυμα επιτυχίας.
  void setSuccess(String message) {
    successMessage = message;
    errorMessage = null;
    isLoading = false;

    notifyListeners();
  }

  // Καθαρίζει όλα τα μηνύματα.
  void clear() {
    errorMessage = null;
    successMessage = null;

    notifyListeners();
  }

  // Μετατρέπει το login error σε κατανοητό μήνυμα.
  String loginErrorMessage(dynamic error) {
    final message = error.toString().toLowerCase();

    if (message.contains('socket') || message.contains('connection')) {
      return 'Δεν υπάρχει σύνδεση στο διαδίκτυο.';
    }

    if (message.contains('401') || message.contains('unauthorized')) {
      return 'Λάθος email ή κωδικός.';
    }

    if (message.contains('timeout')) {
      return 'Η σύνδεση άργησε πολύ. Δοκίμασε ξανά.';
    }

    return 'Αποτυχία σύνδεσης. Δοκίμασε ξανά.';
  }

  // Μετατρέπει το register error σε κατανοητό μήνυμα.
  String registerErrorMessage(dynamic error) {
    final message = error.toString().toLowerCase();

    if (message.contains('socket') || message.contains('connection')) {
      return 'Δεν υπάρχει σύνδεση στο διαδίκτυο.';
    }

    if (message.contains('409') || message.contains('exists')) {
      return 'Ο χρήστης υπάρχει ήδη.';
    }

    if (message.contains('422') || message.contains('validation')) {
      return 'Τα στοιχεία δεν είναι έγκυρα.';
    }

    if (message.contains('timeout')) {
      return 'Η σύνδεση άργησε πολύ. Δοκίμασε ξανά.';
    }

    return 'Αποτυχία εγγραφής. Δοκίμασε ξανά.';
  }

  // Εμφανίζει SnackBar με το αντίστοιχο μήνυμα.
  void showSnackBar(
    BuildContext context,
    String message, {
    Color backgroundColor = Colors.red,
  }) {
    ScaffoldMessenger.of(context).clearSnackBars();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: backgroundColor),
    );
  }
}
