import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// API
import 'package:service_management_mobile/components/Reports/model/report_model.dart';
import 'package:service_management_mobile/components/Reports/provider/reports_provider.dart';

// Widgets
import 'package:service_management_mobile/utils/Widgets/SummaryCard/summary_card.dart';
import 'package:service_management_mobile/utils/Widgets/Tabs/filter_tabs.dart';

// Section σύνοψης και φιλτραρίσματος
// για τη σελίδα "Οι Αιτήματα μου".
//
// Χρησιμοποιεί:
// - FilterTabs για επιλογή status
// - SummaryCard για εμφάνιση του ενεργού count
//
// Τα counts έρχονται από το ReportsProvider.
// Το selectedStatus ενημερώνεται από το ReportsPage.

class ReportsSummary extends StatelessWidget {
  final String? selectedStatus;
  final ValueChanged<String?> onFilterChanged;

  const ReportsSummary({
    super.key,
    required this.selectedStatus,
    required this.onFilterChanged,
  });

  @override
  Widget build(BuildContext context) {
    // Παρακολουθεί τις αλλαγές στα report counts.
    final reportsProvider = context.watch<ReportsProvider>();
    final counts = reportsProvider.counts;

    // Εμφανίζει loading όσο φορτώνονται τα counts.
    if (reportsProvider.countsLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    // Εμφανίζει μήνυμα λάθους.
    if (reportsProvider.countsErrorMessage.isNotEmpty) {
      return Text(
        reportsProvider.countsErrorMessage,
        style: const TextStyle(color: Colors.red),
      );
    }

    // Δεν εμφανίζει το section αν δεν υπάρχουν counts.
    if (counts == null) {
      return const SizedBox.shrink();
    }

    // Παίρνει τα δεδομένα του ενεργού summary.
    final activeSummary = _getActiveSummary(counts);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Tabs φιλτραρίσματος των reports.
        FilterTabs(
          selectedValue: selectedStatus,
          onChanged: onFilterChanged,
          items: const [
            FilterTabItem(label: 'Όλες', value: null),
            FilterTabItem(label: 'Σε εξέλιξη', value: 'in_progress'),
            FilterTabItem(label: 'Ολοκληρωμένες', value: 'resolved'),
          ],
        ),

        const SizedBox(height: 14),

        // Summary card του ενεργού φίλτρου.
        SummaryCard(
          title: activeSummary.title,
          count: activeSummary.count,
          textColor: activeSummary.color,
          backgroundColor: activeSummary.backgroundColor,
        ),
      ],
    );
  }

  // Επιστρέφει τα δεδομένα του ενεργού summary.
  _ActiveSummary _getActiveSummary(ReportCountsModel counts) {
    if (selectedStatus == 'in_progress') {
      return _ActiveSummary(
        title: 'Αιτήματα σε εξέλιξη',
        count: counts.inProgress,
        color: Colors.orange,
        backgroundColor: Colors.orange.shade50,
      );
    }

    if (selectedStatus == 'resolved') {
      return _ActiveSummary(
        title: 'Ολοκληρωμένες Αιτήματα',
        count: counts.solved,
        color: Colors.purple,
        backgroundColor: Colors.purple.shade50,
      );
    }

    return _ActiveSummary(
      title: 'Σύνολο Αιτημάτων',
      count: counts.total,
      color: Colors.blue,
      backgroundColor: Colors.blue.shade50,
    );
  }
}

// Δεδομένα που χρειάζεται το ενεργό SummaryCard.
class _ActiveSummary {
  final String title;
  final int count;
  final Color color;
  final Color backgroundColor;

  const _ActiveSummary({
    required this.title,
    required this.count,
    required this.color,
    required this.backgroundColor,
  });
}
