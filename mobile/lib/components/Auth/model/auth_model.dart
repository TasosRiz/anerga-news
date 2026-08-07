import 'package:flutter/material.dart';

// Διαχειρίζεται την κατάσταση σύνδεσης του χρήστη.
//
// Αποθηκεύει:
// - αν ο χρήστης είναι συνδεδεμένος
// - τα στοιχεία του συνδεδεμένου χρήστη
//
// Ενημερώνει τα widgets μέσω του ChangeNotifier
// όταν γίνεται login ή logout.
class AuthModel extends ChangeNotifier {
  bool _isLoggedIn = false;
  Map<String, dynamic>? _user;

  bool get isLoggedIn => _isLoggedIn;

  Map<String, dynamic>? get user => _user;

  // Ενημερώνει το auth state μετά από επιτυχημένο login/register.
  void loginSuccess(Map<String, dynamic> user) {
    _user = user;
    _isLoggedIn = true;

    notifyListeners();
  }

  // Καθαρίζει το auth state κατά το logout.
  void logout() {
    _user = null;
    _isLoggedIn = false;

    notifyListeners();
  }
}
