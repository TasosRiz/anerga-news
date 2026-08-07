import 'package:service_management_mobile/utils/config.dart';
import 'package:flutter/material.dart';

// Εμφανίζει μία γραμμή πληροφοριών
// με εικονίδιο, τίτλο και τιμή.
class InfoRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color? iconColor;

  const InfoRow({
    super.key,
    required this.icon,
    required this.label,
    required this.value,
    this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Εικονίδιο της πληροφορίας.
        Icon(icon, size: 20, color: iconColor ?? Config.primaryColor),

        const SizedBox(width: 8),

        // Τίτλος και τιμή της πληροφορίας.
        Expanded(
          child: RichText(
            text: TextSpan(
              style: const TextStyle(fontSize: 15, color: Colors.black),
              children: [
                TextSpan(
                  text: '$label: ',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                TextSpan(text: value),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
