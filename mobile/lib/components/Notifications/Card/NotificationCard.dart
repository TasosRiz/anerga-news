import 'package:flutter/material.dart';

class NotificationCard extends StatelessWidget {
  final String title;
  final String message;
  final String type;
  final bool unread;
  final VoidCallback? onTap;
  final DateTime? created_at;

  const NotificationCard({
    super.key,
    required this.title,
    required this.message,
    required this.type,
    this.unread = false,
    this.onTap,
    this.created_at,
  });

  IconData get notificationIcon {
    switch (type) {
      case 'success':
        return Icons.check_circle_outline;

      case 'warning':
        return Icons.warning_amber_rounded;

      case 'urgent':
        return Icons.error_outline;

      case 'info':
      default:
        return Icons.info_outline;
    }
  }

  Color get notificationColor {
    switch (type) {
      case 'success':
        return Colors.green;

      case 'warning':
        return Colors.orange;

      case 'urgent':
        return Colors.red;

      case 'info':
      default:
        return Colors.blue;
    }
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(14),
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: unread ? Colors.blue.withValues(alpha: 0.08) : Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: Colors.grey.shade300),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(notificationIcon, color: notificationColor, size: 26),

            const SizedBox(width: 12),

            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontWeight: unread ? FontWeight.bold : FontWeight.w600,
                    ),
                  ),

                  const SizedBox(height: 4),

                  Text(message, style: TextStyle(color: Colors.grey.shade700)),

                  const SizedBox(height: 10),

                  // Type badge
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: notificationColor.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Text(
                      type,
                      style: TextStyle(
                        color: notificationColor,
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),

                  // Ημερομηνία
                  if (created_at != null) ...[
                    const SizedBox(height: 8),

                    Text(
                      '${created_at!.day.toString().padLeft(2, '0')}/'
                      '${created_at!.month.toString().padLeft(2, '0')}/'
                      '${created_at!.year}',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade500,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
