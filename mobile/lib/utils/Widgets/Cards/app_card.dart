import 'package:service_management_mobile/utils/config.dart';
import 'package:flutter/material.dart';

// Κοινό επαναχρησιμοποιήσιμο card της εφαρμογής.
//
// Δέχεται:
// - οποιοδήποτε child widget
// - προαιρετικό padding
// - προαιρετικό margin
// - προαιρετικό onTap
//
// Αν υπάρχει onTap, εμφανίζει ripple effect.

class AppCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final EdgeInsetsGeometry? margin;
  final VoidCallback? onTap;

  const AppCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(14),
    this.margin,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: margin,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 14,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Material(
        color: Config.cityCard,
        borderRadius: BorderRadius.circular(20),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(20),
          child: Container(
            padding: padding,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Config.cityBorder),
            ),
            child: child,
          ),
        ),
      ),
    );
  }
}
