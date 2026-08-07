import 'package:service_management_mobile/components/Notifications/Card/NotificationCard.dart';
import 'package:service_management_mobile/components/Notifications/api/notifications_api.dart';
import 'package:service_management_mobile/components/Notifications/model/NotificationModel.dart';
import 'package:flutter/material.dart';

class NotificationsList extends StatefulWidget {
  final Future<void> Function()? onNotificationsChanged;

  const NotificationsList({super.key, this.onNotificationsChanged});

  @override
  State<NotificationsList> createState() => _NotificationsListState();
}

class _NotificationsListState extends State<NotificationsList> {
  List<Notificationmodel> notifications = [];

  bool loading = true;
  String error = '';

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    loadNotifications();
  }

  Future<void> loadNotifications() async {
    try {
      setState(() {
        loading = true;
        error = '';
      });

      final data = await NotificationsApi.fetchNotifications();

      if (!mounted) return;

      setState(() {
        notifications = data;
      });
    } catch (e) {
      if (!mounted) return;

      setState(() {
        error = e.toString();
      });
    } finally {
      if (!mounted) return;
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Padding(
        padding: EdgeInsets.all(24),
        child: Center(child: CircularProgressIndicator()),
      );
    }

    if (error.isNotEmpty) {
      return Padding(
        padding: const EdgeInsets.all(16),
        child: Text(error, style: const TextStyle(color: Colors.red)),
      );
    }

    if (notifications.isEmpty) {
      return const Padding(
        padding: EdgeInsets.all(16),
        child: Text('Δεν υπάρχουν ειδοποιήσεις.'),
      );
    }
    return ListView.builder(
      shrinkWrap: true,
      itemCount: notifications.length,
      itemBuilder: (context, index) {
        final notification = notifications[index];

        return NotificationCard(
          title: notification.title,
          message: notification.message,
          type: notification.type,
          unread: notification.unread,
          created_at: notification.created_at,
          onTap: () async {
            try {
              if (notification.unread) {
                await NotificationsApi.markAsRead(notification.id);

                await loadNotifications();

                await widget.onNotificationsChanged?.call();
              }

              if (!context.mounted) return;

              if (notification.sourceType == 'post') {
                Navigator.pushNamed(context, '/posts');

                return;
              }

              if (notification.sourceType == 'report') {
                Navigator.pushNamed(context, '/reports');
              }
            } catch (e) {
              debugPrint('Notification click error: $e');
            }
          },
        );
      },
    );
  }
}
