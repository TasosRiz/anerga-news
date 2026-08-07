// Quick Actions
//
// Εμφανίζει τις βασικές γρήγορες ενέργειες του dashboard.
//
// Περιλαμβάνει:
// - δημιουργία νέας αιτήματος
// - μετάβαση στις αιτήματα του χρήστη
// - μετάβαση στις ανακοινώσεις
// - επιλογή επικοινωνίας
//
// Οι ενέργειες εμφανίζονται σε grid δύο στηλών.

import 'package:service_management_mobile/components/Dashboard/Section_title.dart';
import 'package:service_management_mobile/components/Reports/new_report.dart';
import 'package:service_management_mobile/utils/config.dart';

// Card
import 'package:service_management_mobile/utils/Widgets/ActionCard/action_card.dart';

import 'package:flutter/material.dart';

class QuickActions extends StatelessWidget {
  final String title;

  const QuickActions({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Τίτλος της ενότητας.
        SectionTitle(title: title),

        const SizedBox(height: 14),

        // Grid με τις διαθέσιμες ενέργειες.
        const QuickActionsGrid(),
      ],
    );
  }
}

class QuickActionsGrid extends StatelessWidget {
  const QuickActionsGrid({super.key});

  @override
  Widget build(BuildContext context) {
    // Λίστα με τις γρήγορες ενέργειες του dashboard.
    final actions = [
      {
        'icon': Icons.edit_note_rounded,
        'title': 'Νέα Αίτημα',
        'color': Config.cityOrange,
        'onTap': () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const NewReport()),
          );
        },
      },
      {
        'icon': Icons.assignment_outlined,
        'title': 'Οι Αιτήματα μου',
        'color': Config.cityNavy,
        'onTap': () {
          Navigator.pushNamed(context, '/reports');
        },
      },
      {
        'icon': Icons.campaign_outlined,
        'title': 'Ανακοινώσεις',
        'color': Config.cityNavy,
        'onTap': () {
          Navigator.pushNamed(context, '/posts');
        },
      },
      {
        'icon': Icons.phone,
        'title': 'Επικοινωνία',
        'color': Config.cityNavy,
        'onTap': () {
          Navigator.pushNamed(context, '/posts');
        },
      },
    ];

    return GridView.builder(
      // Συνολικός αριθμός ενεργειών.
      itemCount: actions.length,

      // Επιτρέπει στο grid να πάρει μόνο το ύψος που χρειάζεται.
      shrinkWrap: true,

      // Απενεργοποιεί το δικό του scrolling.
      physics: const NeverScrollableScrollPhysics(),

      // Ρυθμίσεις του grid.
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 14,
        mainAxisSpacing: 14,
        childAspectRatio: 1.45,
      ),

      itemBuilder: (context, index) {
        final item = actions[index];

        return ActionCard(
          icon: item['icon'] as IconData,
          title: item['title'] as String,
          color: item['color'] as Color,
          onTap: item['onTap'] as VoidCallback,
        );
      },
    );
  }
}
