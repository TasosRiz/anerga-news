import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';
import 'package:flutter/material.dart';

// Header της αρχικής οθόνης.
//
// Εμφανίζει:
// - το όνομα του συνδεδεμένου χρήστη
// - avatar με το αρχικό του ονόματος
// - εικονίδιο ειδοποιήσεων
// - βασικό ενημερωτικό μήνυμα της εφαρμογής
//
// Το όνομα φορτώνεται από το AuthStorage.
class DashboardHeader extends StatefulWidget {
  const DashboardHeader({super.key});

  @override
  State<DashboardHeader> createState() => _DashboardHeaderState();
}

class _DashboardHeaderState extends State<DashboardHeader> {
  // Προεπιλεγμένο όνομα μέχρι να φορτωθεί το όνομα από το storage.
  String userName = 'User';

  @override
  void initState() {
    super.initState();

    // Φορτώνει το όνομα του συνδεδεμένου χρήστη.
    loadUserName();
  }

  // Διαβάζει το όνομα χρήστη από το AuthStorage.
  Future<void> loadUserName() async {
    final name = await AuthStorage.userName();

    if (!mounted) {
      return;
    }

    setState(() {
      userName = name ?? 'User';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFF0F3A5A),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 18,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Στοιχεία χρήστη και ειδοποιήσεις.
          _userRow(),

          const SizedBox(height: 22),

          // Ενημερωτικό μήνυμα της εφαρμογής.
          _messageBox(),
        ],
      ),
    );
  }

  // Εμφανίζει avatar, όνομα χρήστη και εικονίδιο ειδοποιήσεων.
  Widget _userRow() {
    return Row(
      children: [
        // Avatar με το πρώτο γράμμα του ονόματος.
        CircleAvatar(
          radius: 25,
          backgroundColor: Colors.white,
          child: Text(
            userName.isNotEmpty ? userName[0].toUpperCase() : 'U',
            style: const TextStyle(
              color: Color(0xFF0F3A5A),
              fontSize: 20,
              fontWeight: FontWeight.w900,
            ),
          ),
        ),

        const SizedBox(width: 12),

        // Μήνυμα καλωσορίσματος και όνομα χρήστη.
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Καλώς ήρθες,',
                style: TextStyle(
                  fontSize: 13,
                  color: Colors.white.withOpacity(0.78),
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                userName,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 22,
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // Εμφανίζει το εικονίδιο ειδοποιήσεων.

  // Εμφανίζει το βασικό ενημερωτικό μήνυμα.
  Widget _messageBox() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.12),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.white.withOpacity(0.12)),
      ),
      child: const Row(
        children: [
          Icon(
            Icons.add_location_alt_rounded,
            color: Color(0xFFE86F2F),
            size: 28,
          ),
          SizedBox(width: 12),
          Expanded(
            child: Text(
              'Αναφέρετε άμεσα προβλήματα στον οργανισμό σας.',
              style: TextStyle(
                color: Colors.white,
                fontSize: 14,
                height: 1.35,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
