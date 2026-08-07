import 'package:service_management_mobile/utils/config.dart';
import 'package:flutter/material.dart';

// Επαναχρησιμοποιήσιμο card για συνοπτικά στατιστικά.
//
// Εμφανίζει:
// - αριθμητικό count
// - τίτλο
//
// Το περιεχόμενο είναι κεντραρισμένο.
// Το onTap είναι προαιρετικό.

class SummaryCard extends StatelessWidget {
  final String title;
  final int count;
  final Color textColor;
  final Color backgroundColor;
  final VoidCallback? onTap;

  const SummaryCard({
    super.key,
    required this.title,
    required this.count,
    required this.textColor,
    required this.backgroundColor,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final card = Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: textColor.withOpacity(0.18)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 16,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Εμφανίζει το συνολικό count.
          Text(
            count.toString(),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 30,
              fontWeight: FontWeight.w900,
              color: textColor,
            ),
          ),

          const SizedBox(height: 8),

          // Εμφανίζει τον τίτλο του στατιστικού.
          Text(
            title,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 13.5,
              height: 1.3,
              color: Config.cityMuted,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );

    if (onTap == null) {
      return card;
    }

    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(20),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: card,
      ),
    );
  }
}
