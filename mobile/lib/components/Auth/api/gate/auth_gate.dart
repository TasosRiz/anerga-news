import 'package:service_management_mobile/components/Auth/api/auth_api.dart';
import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';
import 'package:flutter/material.dart';

//  Ελέγχει την κατάσταση σύνδεσης όταν ανοίγει η εφαρμογή.

//  Αναλαμβάνει:
//  - ανάγνωση του αποθηκευμένου token
//  - έλεγχο του token μέσω του API
//  - μετάβαση στο login όταν δεν υπάρχει έγκυρη σύνδεση
//  - μετάβαση στο main layout όταν ο χρήστης είναι συνδεδεμένος
//  - offline είσοδο όταν υπάρχει αποθηκευμένο token
class AuthGate extends StatefulWidget {
  const AuthGate({super.key});

  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  @override
  void initState() {
    super.initState();

    // Εκτελεί τον έλεγχο σύνδεσης μόλις ανοίξει η σελίδα.
    _checkAuth();
  }

  // Ελέγχει αν ο χρήστης έχει ενεργή ή αποθηκευμένη σύνδεση.
  Future<void> _checkAuth() async {
    // Διαβάζει το token από το τοπικό storage.
    final token = await AuthStorage.token();

    if (!mounted) {
      return;
    }

    // Αν δεν υπάρχει token, εμφανίζει τη σελίδα σύνδεσης.
    if (token == null || token.isEmpty) {
      Navigator.of(context).pushReplacementNamed('/');
      return;
    }

    try {
      // Ελέγχει μέσω του API αν το token είναι ακόμα έγκυρο.
      final user = await AuthApi().getUser(token);

      if (!mounted) {
        return;
      }

      // Αν φορτώθηκε ο χρήστης, ανοίγει την κύρια εφαρμογή.
      if (user != null) {
        Navigator.of(context).pushReplacementNamed('/main');
        return;
      }

      // Αν το token δεν είναι έγκυρο, καθαρίζει τα auth δεδομένα.
      await AuthStorage.clearAuthInfo();

      if (!mounted) {
        return;
      }

      // Επιστρέφει τον χρήστη στη σελίδα σύνδεσης.
      Navigator.of(context).pushReplacementNamed('/');
    } catch (_) {
      if (!mounted) {
        return;
      }

      // Αν αποτύχει το API λόγω σύνδεσης, επιτρέπει offline είσοδο,
      // επειδή υπάρχει ήδη αποθηκευμένο token.
      Navigator.of(context).pushReplacementNamed('/main');
    }
  }

  @override
  Widget build(BuildContext context) {
    // Εμφανίζεται όσο ολοκληρώνεται ο έλεγχος σύνδεσης.
    return const Scaffold(body: Center(child: CircularProgressIndicator()));
  }
}
