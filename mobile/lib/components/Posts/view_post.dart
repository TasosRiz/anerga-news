import 'package:flutter/material.dart';

// API
import 'package:service_management_mobile/api/api_config.dart';
import 'package:service_management_mobile/components/Posts/model/post_model.dart';

// Widgets
import 'package:service_management_mobile/utils/Widgets/Cards/app_card.dart';
import 'package:service_management_mobile/utils/Widgets/InfoRow/info_row.dart';

// Config

import 'package:service_management_mobile/utils/config.dart';

// Εμφανίζει όλες τις λεπτομέρειες μιας ανακοίνωσης.
//
// Περιλαμβάνει:
// - φωτογραφία
// - τίτλο
// - κατηγορία
// - ημερομηνία δημοσίευσης
// - περιεχόμενο ανακοίνωσης

class ViewPost extends StatelessWidget {
  final PostModel post;

  const ViewPost({super.key, required this.post});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ανακοίνωση'),
        backgroundColor: Config.primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: AppCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Φωτογραφία ανακοίνωσης.
              if (post.photo != null && post.photo!.trim().isNotEmpty) ...[
                _photoSection(),
                const SizedBox(height: 18),
              ],

              // Τίτλος ανακοίνωσης.
              Text(
                post.title,
                style: const TextStyle(
                  color: Color(0xFF10243D),
                  fontSize: 20,
                  fontWeight: FontWeight.w900,
                ),
              ),

              const SizedBox(height: 14),

              // Κατηγορία ανακοίνωσης.
              InfoRow(
                icon: Icons.category_outlined,
                label: 'Κατηγορία',
                value: post.category?.name ?? 'Χωρίς κατηγορία',
              ),

              const SizedBox(height: 10),

              // Ημερομηνία δημοσίευσης.
              InfoRow(
                icon: Icons.calendar_month_outlined,
                label: 'Ημερομηνία',
                value: post.publishedAt ?? '—',
              ),

              const SizedBox(height: 18),

              // Πλήρες περιεχόμενο ανακοίνωσης.
              Text(
                post.body.isEmpty ? 'Δεν υπάρχει περιεχόμενο' : post.body,
                style: TextStyle(
                  color: Colors.grey.shade800,
                  fontSize: 15,
                  height: 1.45,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // Εμφανίζει τη φωτογραφία της ανακοίνωσης.
  Widget _photoSection() {
    final photo = post.photo?.trim() ?? '';

    if (photo.isEmpty) {
      return const SizedBox.shrink();
    }

    // Δημιουργεί το πλήρες URL της φωτογραφίας.
    final photoUrl = photo.startsWith('http')
        ? photo
        : '${ApiConfig.baseUrl}/$photo';

    return ClipRRect(
      borderRadius: BorderRadius.circular(12),
      child: Image.network(
        photoUrl,
        width: double.infinity,
        height: 220,
        fit: BoxFit.cover,

        // Εμφανίζει fallback αν η φωτογραφία δεν φορτωθεί.
        errorBuilder: (context, error, stackTrace) {
          return Container(
            width: double.infinity,
            height: 160,
            decoration: BoxDecoration(
              color: Colors.grey.shade200,
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Center(
              child: Text('Δεν ήταν δυνατή η φόρτωση της φωτογραφίας'),
            ),
          );
        },
      ),
    );
  }
}
