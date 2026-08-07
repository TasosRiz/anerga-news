import 'package:flutter/material.dart';

// Notifications
import 'package:service_management_mobile/components/Notifications/List/NotificationsList.dart';
import 'package:service_management_mobile/components/Notifications/api/notifications_api.dart';

class NotificationPanel extends StatefulWidget {
  final Future<void> Function()? onNotificationsChanged;

  const NotificationPanel({super.key, this.onNotificationsChanged});

  @override
  State<NotificationPanel> createState() => _NotificationPanelState();
}

class _NotificationPanelState extends State<NotificationPanel> {
  // Χρησιμοποιείται για refresh της λίστας.
  int refreshKey = 0;

  Future<void> _markAllAsRead() async {
    try {
      // Μαρκάρει όλες τις ειδοποιήσεις ως read.
      await NotificationsApi.markAllAsRead();

      // Ανανεώνει το badge του bell.
      await widget.onNotificationsChanged?.call();

      if (!mounted) return;

      // Ανανεώνει και τη λίστα μέσα στο panel.
      setState(() {
        refreshKey++;
      });
    } catch (e) {
      debugPrint('Mark all as read error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Header
            const SizedBox(height: 16),
            _panelTitle(),
            const SizedBox(height: 16),
            _panelList(),
          ],
        ),
      ),
    );
  }

  Widget _panelTitle() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          'Ειδοποιήσεις',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),

        TextButton(
          onPressed: _markAllAsRead,
          child: const Text('Όλες ως διαβασμένες'),
        ),
      ],
    );
  }

  Widget _panelList() {
    return Expanded(
      child: NotificationsList(
        key: ValueKey(refreshKey),
        onNotificationsChanged: widget.onNotificationsChanged,
      ),
    );
  }
}
