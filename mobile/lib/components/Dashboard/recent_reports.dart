import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Widgets
import 'package:service_management_mobile/components/Dashboard/Section_title.dart';
import 'package:service_management_mobile/components/Reports/ReportCard/report_card.dart';
import 'package:service_management_mobile/utils/Widgets/Cards/app_card.dart';

// Providers
import 'package:service_management_mobile/components/Reports/provider/reports_provider.dart';

// Reports
import 'package:service_management_mobile/components/Reports/view_report.dart';

// Εμφανίζει τις 3 πιο πρόσφατες αιτήματα του χρήστη.
//
// Τα δεδομένα προέρχονται από το ReportsProvider.
//
// Διαχειρίζεται:
// - loading
// - error message
// - empty state
// - navigation στις λεπτομέρειες της αιτήματος

class RecentReports extends StatelessWidget {
  const RecentReports({super.key});

  @override
  Widget build(BuildContext context) {
    // Παρακολουθεί τις αλλαγές του ReportsProvider.
    final reportsProvider = context.watch<ReportsProvider>();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionTitle(title: 'Πρόσφατες Αιτήματα'),

        const SizedBox(height: 12),

        // Εμφανίζει loading όσο φορτώνονται οι αιτήματα.
        if (reportsProvider.loading)
          const Center(child: CircularProgressIndicator())
        // Εμφανίζει μήνυμα λάθους.
        else if (reportsProvider.errorMessage.isNotEmpty)
          AppCard(
            child: Text(
              reportsProvider.errorMessage,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.red,
                fontWeight: FontWeight.w600,
              ),
            ),
          )
        // Εμφανίζει τη λίστα των πρόσφατων αιτημάτων.
        else
          _reportsContent(context, reportsProvider),
      ],
    );
  }

  // Δημιουργεί το περιεχόμενο των πρόσφατων αιτημάτων.
  Widget _reportsContent(
    BuildContext context,
    ReportsProvider reportsProvider,
  ) {
    // Δημιουργεί αντίγραφο της λίστας και ταξινομεί
    // τις αιτήματα από τη νεότερη στην παλαιότερη.
    final reports = [...reportsProvider.reports]
      ..sort((a, b) => b.createdAt.compareTo(a.createdAt));

    // Κρατά μόνο τις 3 πιο πρόσφατες αιτήματα.
    final visibleReports = reports.take(3).toList();

    // Empty state όταν δεν υπάρχουν αιτήματα.
    if (visibleReports.isEmpty) {
      return AppCard(
        child: Column(
          children: [
            Icon(Icons.report_outlined, size: 40, color: Colors.grey.shade400),
            const SizedBox(height: 10),
            Text(
              'Δεν υπάρχουν αιτήματα',
              style: TextStyle(fontSize: 14, color: Colors.grey.shade600),
            ),
          ],
        ),
      );
    }

    // Εμφανίζει τις 3 πιο πρόσφατες αιτήματα.
    return Column(
      children: visibleReports.map((report) {
        return ReportCard(
          report: report,
          showActions: false,
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => ViewReport(report: report)),
            );
          },
        );
      }).toList(),
    );
  }
}
