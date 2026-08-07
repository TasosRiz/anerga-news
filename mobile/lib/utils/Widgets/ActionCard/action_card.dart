import 'package:service_management_mobile/utils/config.dart';
import 'package:flutter/material.dart';

// Επαναχρησιμοποιήσιμο card για τις γρήγορες ενέργειες.
//
// Εμφανίζει:
// - εικονίδιο
// - τίτλο
// - ripple effect κατά το πάτημα
//
// Το onTap καθορίζει την ενέργεια που εκτελείται.

class ActionCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final Color color;
  final VoidCallback onTap;

  const ActionCard({
    super.key,
    required this.icon,
    required this.title,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Config.cityCard,
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        // Εκτελεί την ενέργεια του card.
        onTap: onTap,

        // Κρατά το ripple effect μέσα στις στρογγυλεμένες γωνίες.
        borderRadius: BorderRadius.circular(18),

        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 12),
          decoration: BoxDecoration(
            color: Config.cityCard,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: Config.cityBorder),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 14,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Εικονίδιο της ενέργειας.
              Icon(icon, color: color, size: 34),

              const SizedBox(height: 12),

              // Τίτλος της ενέργειας.
              Text(
                title,
                textAlign: TextAlign.center,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  color: Config.cityText,
                  fontSize: 13.5,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
