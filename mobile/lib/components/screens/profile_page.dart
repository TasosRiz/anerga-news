import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// API
import 'package:service_management_mobile/components/Auth/api/auth_api.dart';
import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';
import 'package:service_management_mobile/components/Auth/model/auth_model.dart';

// Config
import 'package:service_management_mobile/utils/config.dart';

// Εμφανίζει τα βασικά στοιχεία του χρήστη.
//
// Περιλαμβάνει:
// - όνομα και email χρήστη
// - επιλογές προφίλ
// - ρυθμίσεις
// - αλλαγή κωδικού
// - αποσύνδεση

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  // Διαχειρίζεται ολόκληρη τη διαδικασία αποσύνδεσης.
  Future<void> _handleLogout() async {
    final token = await AuthStorage.token();

    try {
      // Προσπαθεί να κάνει logout από τον server.
      if (token != null && token.isNotEmpty) {
        await AuthApi().logout(token);
      }
    } catch (e) {
      // Το logout συνεχίζεται ακόμη και αν ο server δεν είναι διαθέσιμος.
      debugPrint('Server logout failed: $e');
    } finally {
      // Καθαρίζει πάντα τα τοπικά auth δεδομένα.
      await AuthStorage.clearAuthInfo();
    }

    if (!mounted) return;

    // Καθαρίζει το authentication state.
    context.read<AuthModel>().logout();

    // Επιστρέφει στο login και αφαιρεί όλα τα προηγούμενα routes.
    Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Το προφίλ μου'),
        backgroundColor: Config.primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          const ProfileHeader(),

          Config.spaceSmall,

          Divider(color: Colors.grey.shade300),

          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Column(
              children: [
                _profileButton(),

                Divider(color: Colors.grey.shade300),

                _settingsButton(),

                Divider(color: Colors.grey.shade300),

                _changePasswordButton(),

                Divider(color: Colors.grey.shade300),

                _logoutButton(),

                Divider(color: Colors.grey.shade300),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Εμφανίζει την επιλογή προφίλ.
  Widget _profileButton() {
    return _profileMenuItem(
      icon: Icons.person,
      title: 'Προφίλ',
      onTap: () {
        // TODO: Navigation προς τη σελίδα προφίλ.
      },
    );
  }

  // Εμφανίζει την επιλογή ρυθμίσεων.
  Widget _settingsButton() {
    return _profileMenuItem(
      icon: Icons.settings,
      title: 'Ρυθμίσεις',
      onTap: () {
        // TODO: Navigation προς τη σελίδα ρυθμίσεων.
      },
    );
  }

  // Εμφανίζει την επιλογή αλλαγής κωδικού.
  Widget _changePasswordButton() {
    return _profileMenuItem(
      icon: Icons.lock,
      title: 'Αλλαγή κωδικού',
      onTap: () {
        // TODO: Navigation προς τη σελίδα αλλαγής κωδικού.
      },
    );
  }

  // Εμφανίζει την επιλογή αποσύνδεσης.
  Widget _logoutButton() {
    return _profileMenuItem(
      icon: Icons.logout_outlined,
      title: 'Αποσύνδεση',
      onTap: _handleLogout,
    );
  }

  // Κοινό widget για τις επιλογές του προφίλ.
  Widget _profileMenuItem({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10),
        child: Row(
          children: [
            Icon(icon, color: Config.primaryColor, size: 32),

            const SizedBox(width: 20),

            Expanded(
              child: Text(
                title,
                style: const TextStyle(
                  color: Config.primaryColor,
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),

            Icon(Icons.chevron_right, color: Colors.grey.shade500, size: 20),
          ],
        ),
      ),
    );
  }
}

// Profile Header
//
// Φορτώνει και εμφανίζει το όνομα
// και το email του συνδεδεμένου χρήστη.

class ProfileHeader extends StatefulWidget {
  const ProfileHeader({super.key});

  @override
  State<ProfileHeader> createState() => _ProfileHeaderState();
}

class _ProfileHeaderState extends State<ProfileHeader> {
  String userName = 'User';
  String email = 'user@example.com';

  @override
  void initState() {
    super.initState();
    loadUserInfo();
  }

  // Φορτώνει το όνομα και το email από το AuthStorage.
  Future<void> loadUserInfo() async {
    final name = await AuthStorage.userName();
    final emailValue = await AuthStorage.userEmail();

    if (!mounted) return;

    setState(() {
      userName = name ?? 'User';
      email = emailValue ?? 'user@example.com';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          // Avatar χρήστη.
          const CircleAvatar(
            radius: 24,
            backgroundColor: Config.primaryColor,
            child: Icon(Icons.person, color: Colors.white, size: 28),
          ),

          const SizedBox(width: 12),

          // Όνομα και email χρήστη.
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  userName,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 6),

                Text(
                  email,
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey.shade700,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],
            ),
          ),

          // Εικονίδιο ειδοποιήσεων.
          const CircleAvatar(
            radius: 20,
            backgroundColor: Config.primaryColor,
            child: Icon(Icons.notifications, color: Colors.white, size: 20),
          ),
        ],
      ),
    );
  }
}
