import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Widgets
import 'package:service_management_mobile/components/Reports/ReportCard/report_card.dart';
import 'package:service_management_mobile/components/Reports/ReportsSummary/reports_summary.dart';
import 'package:service_management_mobile/utils/Widgets/Cards/app_card.dart';

// Actions
import 'package:service_management_mobile/components/Reports/new_report.dart';
import 'package:service_management_mobile/components/Reports/view_report.dart';
import 'package:service_management_mobile/components/Reports/edit_report.dart';

// API
import 'package:service_management_mobile/components/Reports/model/report_model.dart';
import 'package:service_management_mobile/components/Reports/provider/reports_provider.dart';

// Config
import 'package:service_management_mobile/utils/config.dart';

// Σελίδα που εμφανίζει τις αιτήματα του συνδεδεμένου χρήστη.
//
// Αναλαμβάνει:
// - φόρτωση των reports
// - φόρτωση των report counts
// - φιλτράρισμα με βάση το status
// - προβολή report
// - επεξεργασία report
// - διαγραφή report
// - δημιουργία νέου report
// - loading, error και empty states

class ReportsPage extends StatefulWidget {
  const ReportsPage({super.key});

  @override
  State<ReportsPage> createState() => _ReportsPageState();
}

class _ReportsPageState extends State<ReportsPage> {
  // Τρέχον επιλεγμένο status filter.
  String? selectedStatus;

  @override
  void initState() {
    super.initState();

    // Φορτώνει reports και counts μετά το πρώτο build.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) {
        return;
      }

      _loadReports();
    });
  }

  // Φορτώνει τα reports και τα counts του χρήστη.
  Future<void> _loadReports() async {
    final reportsProvider = context.read<ReportsProvider>();

    await reportsProvider.fetchUserReports();
    await reportsProvider.loadUserReportCounts();
  }

  // Εμφανίζει confirmation dialog και διαγράφει το report.
  //
  // TO DO -cancel για να διαγραφεται απο Admin Panel
  Future<void> _confirmDelete(ReportModel report) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          title: const Text('Διαγραφή αιτήματος'),
          content: Text(
            'Θέλεις σίγουρα να διαγράψεις την αίτημα "${report.title}";',
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(dialogContext, false);
              },
              child: const Text('Άκυρο'),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(dialogContext, true);
              },
              child: const Text(
                'Διαγραφή',
                style: TextStyle(color: Colors.red),
              ),
            ),
          ],
        );
      },
    );

    if (confirm != true || !mounted) {
      return;
    }

    final reportsProvider = context.read<ReportsProvider>();
    final success = await reportsProvider.deleteReport(report.id);

    if (!mounted) {
      return;
    }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          success ? 'Η αίτημα διαγράφηκε.' : reportsProvider.errorMessage,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Παρακολουθεί τις αλλαγές του provider.
    final reportsProvider = context.watch<ReportsProvider>();

    final reports = reportsProvider.reports;
    final loading = reportsProvider.loading;
    final errorMessage = reportsProvider.errorMessage;

    // Φιλτράρει τις αιτήματα με βάση το επιλεγμένο status.
    final filteredReports = selectedStatus == null
        ? reports
        : reports.where((report) => report.status == selectedStatus).toList();

    if (loading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (errorMessage.isNotEmpty) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Οι Αιτήματα μου'),
          backgroundColor: Config.primaryColor,
          foregroundColor: Colors.white,
        ),
        body: Center(child: Text(errorMessage, textAlign: TextAlign.center)),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Οι Αιτήματα μου'),
        backgroundColor: Config.primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Summary και status filters.
          ReportsSummary(
            selectedStatus: selectedStatus,
            onFilterChanged: (status) {
              setState(() {
                selectedStatus = status;
              });
            },
          ),

          const SizedBox(height: 20),

          // Empty state όταν δεν υπάρχουν reports.
          if (filteredReports.isEmpty)
            AppCard(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.assignment_outlined,
                    size: 42,
                    color: Colors.grey.shade400,
                  ),
                  const SizedBox(height: 10),
                  Text(
                    'Δεν υπάρχουν αιτήματα',
                    style: TextStyle(
                      color: Colors.grey.shade600,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            )
          else
            // Εμφανίζει τα reports.
            ...filteredReports.map((report) {
              return ReportCard(
                report: report,
                showActions: true,

                // Ανοίγει τις λεπτομέρειες του report.
                onView: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => ViewReport(report: report),
                    ),
                  );
                },

                // Ανοίγει τη φόρμα επεξεργασίας.
                onEdit: () async {
                  final result = await Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) => EditReport(report: report),
                    ),
                  );

                  if (!mounted) {
                    return;
                  }

                  if (result == true) {
                    await _loadReports();
                  }
                },

                // Διαγράφει το report μετά από επιβεβαίωση.
                onDelete: () {
                  _confirmDelete(report);
                },
              );
            }),
        ],
      ),

      // Κουμπί δημιουργίας νέας αιτήματος.
      floatingActionButton: _createReportButton(),
    );
  }

  // Ανοίγει τη φόρμα δημιουργίας νέας αιτήματος.
  Widget _createReportButton() {
    return FloatingActionButton(
      backgroundColor: Config.cityOrange,
      onPressed: () async {
        final result = await Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const NewReport()),
        );

        if (!mounted) {
          return;
        }

        if (result == true) {
          await _loadReports();
        }
      },
      child: const Icon(Icons.add, color: Colors.white),
    );
  }
}
