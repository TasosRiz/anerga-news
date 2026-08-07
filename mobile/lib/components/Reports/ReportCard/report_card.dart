import 'package:flutter/material.dart';

// API
import 'package:service_management_mobile/api/api_config.dart';
import 'package:service_management_mobile/components/Reports/model/report_model.dart';

// Helpers-Reports
import 'package:service_management_mobile/components/Reports/helper/report_helpers.dart';

// Widget
import 'package:service_management_mobile/utils/Widgets/Cards/app_card.dart';

// Config
import 'package:service_management_mobile/utils/config.dart';

// Κοινό widget εμφάνισης αιτήματος.
//
// Χρησιμοποιείται:
// - στην αρχική οθόνη για τις πρόσφατες αιτήματα
// - στη σελίδα "Οι Αιτήματα μου"
//
// Εμφανίζει:
// - φωτογραφία ή εικονίδιο αιτήματος
// - τίτλο
// - κατηγορία
// - ημερομηνία
// - status badge
//
// Αν το showActions είναι true, εμφανίζει:
// - View
// - Edit
// - Delete
//
// Η λογική των ενεργειών περνάει από το parent
// μέσω των callbacks.

class ReportCard extends StatelessWidget {
  final ReportModel report;
  final bool showActions;
  final VoidCallback? onTap;
  final VoidCallback? onView;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;

  const ReportCard({
    super.key,
    required this.report,
    this.showActions = false,
    this.onTap,
    this.onView,
    this.onEdit,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    // Χρώμα που αντιστοιχεί στο status της αιτήματος.
    final color = statusColor(report.status);

    return AppCard(
      margin: const EdgeInsets.only(bottom: 14),
      onTap: onTap,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              // Φωτογραφία ή εικονίδιο αιτήματος.
              _reportIcon(color),

              const SizedBox(width: 12),

              // Τίτλος, κατηγορία και ημερομηνία.
              Expanded(child: _reportInfo()),

              const SizedBox(width: 8),

              // Status badge.
              _statusBadge(color),

              // Βέλος όταν το card χρησιμοποιείται χωρίς actions.
              if (!showActions)
                Icon(Icons.chevron_right, color: Colors.grey.shade500),
            ],
          ),

          // Κουμπιά ενεργειών.
          if (showActions) ...[const SizedBox(height: 12), _actionsRow()],
        ],
      ),
    );
  }

  // Εμφανίζει φωτογραφία ή fallback icon.
  Widget _reportIcon(Color color) {
    final hasPhoto = report.photo.trim().isNotEmpty;

    if (!hasPhoto) {
      return _fallbackIcon(color);
    }

    final photoUrl = report.photo.startsWith('http')
        ? report.photo
        : '${ApiConfig.baseUrl}/${report.photo}';

    return ClipRRect(
      borderRadius: BorderRadius.circular(14),
      child: Image.network(
        photoUrl,
        width: 48,
        height: 48,
        fit: BoxFit.cover,
        errorBuilder: (_, __, ___) {
          return _fallbackIcon(color);
        },
      ),
    );
  }

  // Εμφανίζει fallback icon όταν δεν υπάρχει φωτογραφία.
  Widget _fallbackIcon(Color color) {
    return Container(
      width: 48,
      height: 48,
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Icon(Icons.report_outlined, color: color, size: 24),
    );
  }

  // Εμφανίζει τα βασικά στοιχεία της αιτήματος.
  Widget _reportInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          report.title,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.w800,
            color: Config.cityText,
          ),
        ),
        const SizedBox(height: 5),
        Text(
          report.category?.name ?? '—',
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: const TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.bold,
            color: Config.cityMuted,
          ),
        ),
        const SizedBox(height: 7),
        Text(
          formatDate(report.createdAt),
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey.shade600,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  // Εμφανίζει το status της αιτήματος.
  Widget _statusBadge(Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.13),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        formatStatus(report.status),
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w700,
          color: color,
        ),
      ),
    );
  }

  // Εμφανίζει τα κουμπιά προβολής, επεξεργασίας και διαγραφής.
  Widget _actionsRow() {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(onPressed: onView, child: const Text('View')),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: OutlinedButton(onPressed: onEdit, child: const Text('Edit')),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: ElevatedButton(
            // TODO:
            // Να αντικατασταθεί με cancel ή soft delete,
            // ώστε η αίτημα να παραμένει ορατή στον admin.
            onPressed: onDelete,
            style: ElevatedButton.styleFrom(
              backgroundColor: Config.danger,
              foregroundColor: Colors.white,
            ),
            child: const Text('Delete'),
          ),
        ),
      ],
    );
  }
}
