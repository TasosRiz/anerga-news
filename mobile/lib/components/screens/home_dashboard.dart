import 'package:service_management_mobile/components/Notifications/Panel/NotificationPanel.dart';
import 'package:service_management_mobile/utils/config.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Widgets
import 'package:service_management_mobile/components/Dashboard/dashboard_header.dart';
import 'package:service_management_mobile/components/Dashboard/latest_announcements.dart';
import 'package:service_management_mobile/components/Dashboard/recent_reports.dart';
import 'package:service_management_mobile/components/Dashboard/dashboard_summary.dart';
import 'package:service_management_mobile/components/Dashboard/quick_actions.dart';

// API
import 'package:service_management_mobile/components/Posts/provider/posts_provider.dart';
import 'package:service_management_mobile/components/Reports/provider/reports_provider.dart';
import 'package:service_management_mobile/components/Notifications/api/notifications_api.dart';

import 'package:service_management_mobile/components/Notifications/NotificationBell/NotificationBell.dart';

// Κεντρική σελίδα του χρήστη μετά τη σύνδεση.
//
// Αναλαμβάνει:
// - φόρτωση των reports του χρήστη
// - φόρτωση των δημόσιων ανακοινώσεων
// - φόρτωση των συνολικών counts
// - εμφάνιση γρήγορων ενεργειών και πρόσφατων δεδομένων

class HomeDashboard extends StatefulWidget {
  @override
  _HomeDashboardState createState() => _HomeDashboardState();
}

int unreadCount = 0;

class _HomeDashboardState extends State<HomeDashboard> {
  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) {
        return;
      }

      _loadDashboardData();
      loadUnreadCount();
    });
  }

  Future<void> loadUnreadCount() async {
    try {
      final count = await NotificationsApi.fetchUnreadCount();

      if (!mounted) return;

      setState(() {
        unreadCount = count;
      });
    } catch (e) {
      debugPrint('Unread count error: $e');
    }
  }

  // Φορτώνει όλα τα δεδομένα που χρειάζεται το dashboard.
  Future<void> _loadDashboardData() async {
    final reportsProvider = context.read<ReportsProvider>();
    final postsProvider = context.read<PostsProvider>();

    await Future.wait([
      reportsProvider.fetchUserReports(),
      reportsProvider.loadUserReportCounts(),
      postsProvider.fetchPublicPosts(),
      postsProvider.loadPostsCounts(),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Config.cityBg,

      appBar: AppBar(
        title: Text('ServiceKit'),
        elevation: 0,
        backgroundColor: Config.cityNavy,

        foregroundColor: Colors.white,
        actions: [
          NotificationBell(
            unreadCount: unreadCount,
            onTap: () {
              showModalBottomSheet(
                context: context,
                isScrollControlled: true,
                showDragHandle: true,
                builder: (context) {
                  return FractionallySizedBox(
                    heightFactor: 0.75,
                    child: NotificationPanel(
                      onNotificationsChanged: loadUnreadCount,
                    ),
                  );
                },
              );
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 18, 16, 28),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Καλωσόρισμα και στοιχεία χρήστη.
                const DashboardHeader(),

                const SizedBox(height: 20),

                // Γρήγορες ενέργειες του χρήστη.
                const QuickActions(title: 'Γρήγορες ενέργειες'),

                const SizedBox(height: 22),

                // Συνοπτικά στατιστικά reports και posts.
                const DashboardSummary(),

                const SizedBox(height: 22),

                // Πρόσφατες αιτήματα του χρήστη.
                const RecentReports(),

                const SizedBox(height: 22),

                // Τελευταίες δημόσιες ανακοινώσεις.
                const LatestAnnouncements(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
