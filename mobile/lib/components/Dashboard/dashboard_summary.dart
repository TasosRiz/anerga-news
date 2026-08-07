import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Providers
import 'package:service_management_mobile/components/Reports/provider/reports_provider.dart';
import 'package:service_management_mobile/components/Posts/provider/posts_provider.dart';

// Widgets
import 'package:service_management_mobile/components/Dashboard/Section_title.dart';
import 'package:service_management_mobile/utils/Widgets/SummaryCard/summary_card.dart';

// Εμφανίζει συνοπτικά στατιστικά στην αρχική οθόνη.
//
// Τα δεδομένα προέρχονται από:
// - ReportsProvider για τις αιτήματα
// - PostsProvider για τις ανακοινώσεις
//
// Διαχειρίζεται επίσης:
// - loading state
// - error messages
// - εμφάνιση των counts σε SummaryCard

class DashboardSummary extends StatelessWidget {
  const DashboardSummary({super.key});

  @override
  Widget build(BuildContext context) {
    // Παρακολουθεί τις αλλαγές στα reports και στα posts.
    final reportsProvider = context.watch<ReportsProvider>();
    final postsProvider = context.watch<PostsProvider>();

    // Counts των reports και των posts.
    final reportsCounts = reportsProvider.counts;
    final postsCounts = postsProvider.counts;

    // Εμφανίζει loading όσο φορτώνονται τα δεδομένα.
    // Εμφανίζει loading όσο φορτώνονται τα δεδομένα.
    if (reportsProvider.countsLoading || postsProvider.countsLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    // Εμφανίζει error από τα reports.
    if (reportsProvider.countsErrorMessage.isNotEmpty) {
      return Text(
        reportsProvider.countsErrorMessage,
        style: const TextStyle(color: Colors.red),
      );
    }

    // Εμφανίζει error από τα posts.
    if (postsProvider.countsErrorMessage.isNotEmpty) {
      return Text(
        postsProvider.countsErrorMessage,
        style: const TextStyle(color: Colors.red),
      );
    }

    // Δεν εμφανίζει το section αν δεν υπάρχουν counts.
    if (reportsCounts == null || postsCounts == null) {
      return const SizedBox.shrink();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Τίτλος της ενότητας.
        const SectionTitle(title: 'Σύνοψη Αιτημάτων'),

        const SizedBox(height: 16),

        // Grid με τα συνοπτικά στατιστικά.
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.45,
          children: [
            // Αιτήματα που βρίσκονται σε εξέλιξη.
            SummaryCard(
              title: 'Σε εξέλιξη',
              count: reportsCounts.inProgress,
              textColor: Colors.orange,
              backgroundColor: Colors.orange.shade50,
            ),

            // Νέες δημόσιες ανακοινώσεις.
            SummaryCard(
              title: 'Νέες',
              count: postsCounts.newPosts,
              textColor: Colors.blue.shade700,
              backgroundColor: Colors.blue.shade50,
            ),
          ],
        ),
      ],
    );
  }
}
