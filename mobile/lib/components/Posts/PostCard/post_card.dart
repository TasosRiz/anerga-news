import 'package:flutter/material.dart';

// Config
import 'package:service_management_mobile/utils/config.dart';

// API
import 'package:service_management_mobile/api/api_config.dart';
import 'package:service_management_mobile/components/Posts/model/post_model.dart';

// Card
import 'package:service_management_mobile/utils/Widgets/Cards/app_card.dart';

// Κοινό card για την εμφάνιση μιας ανακοίνωσης.
//
// Χρησιμοποιείται:
// - στο dashboard για τις τελευταίες ανακοινώσεις
// - στη σελίδα όλων των ανακοινώσεων
//
// Εμφανίζει φωτογραφία όταν υπάρχει.
// Αν δεν υπάρχει ή αποτύχει η φόρτωση,
// εμφανίζει το εικονίδιο ανακοίνωσης.
//
// Η πλοήγηση περνάει από το parent μέσω του onTap.

class PostCard extends StatelessWidget {
  final PostModel post;
  final bool compact;
  final VoidCallback? onTap;

  const PostCard({
    super.key,
    required this.post,
    this.compact = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return AppCard(
      margin: const EdgeInsets.only(bottom: 14),
      onTap: onTap,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Εμφανίζει φωτογραφία ή fallback icon.
          _postImage(),

          const SizedBox(width: 12),

          // Βασικές πληροφορίες της ανακοίνωσης.
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _postTitle(),

                const SizedBox(height: 6),

                _postMeta(),

                // Η περιγραφή εμφανίζεται μόνο στο κανονικό mode.
                if (!compact) ...[
                  const SizedBox(height: 8),
                  _postBodyPreview(),
                ],
              ],
            ),
          ),

          const SizedBox(width: 8),

          // Δείχνει ότι το card ανοίγει σε νέα σελίδα.
          Icon(Icons.chevron_right, color: Colors.grey.shade500),
        ],
      ),
    );
  }

  // Εμφανίζει τη φωτογραφία της ανακοίνωσης.
  //
  // Αν δεν υπάρχει φωτογραφία ή αποτύχει η φόρτωση,
  // εμφανίζει το εικονίδιο ανακοίνωσης.
  Widget _postImage() {
    final photo = post.photo?.trim() ?? '';

    if (photo.isEmpty) {
      return _postIcon();
    }

    // Δημιουργεί το πλήρες URL της φωτογραφίας.
    final photoUrl = photo.startsWith('http')
        ? photo
        : '${ApiConfig.baseUrl}/$photo';

    return ClipRRect(
      borderRadius: BorderRadius.circular(14),
      child: Image.network(
        photoUrl,
        width: 46,
        height: 46,
        fit: BoxFit.cover,

        // Εμφανίζει fallback αν η εικόνα δεν φορτωθεί.
        errorBuilder: (context, error, stackTrace) {
          return _postIcon();
        },
      ),
    );
  }

  // Εμφανίζει το fallback εικονίδιο της ανακοίνωσης.
  Widget _postIcon() {
    return Container(
      width: 46,
      height: 46,
      decoration: BoxDecoration(
        color: Config.primaryColor.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(14),
      ),
      child: const Icon(
        Icons.campaign_outlined,
        color: Config.primaryColor,
        size: 24,
      ),
    );
  }

  // Εμφανίζει τον τίτλο της ανακοίνωσης.
  Widget _postTitle() {
    return Text(
      post.title,
      maxLines: compact ? 1 : 2,
      overflow: TextOverflow.ellipsis,
      style: const TextStyle(
        color: Color(0xFF10243D),
        fontSize: 15,
        fontWeight: FontWeight.w800,
      ),
    );
  }

  // Εμφανίζει την κατηγορία και την ημερομηνία.
  Widget _postMeta() {
    return Row(
      children: [
        // Κατηγορία ανακοίνωσης.
        Flexible(
          child: Text(
            post.category?.name ?? 'Χωρίς κατηγορία',
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              color: Colors.grey.shade700,
              fontSize: 12.5,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),

        const SizedBox(width: 8),

        Text(
          '•',
          style: TextStyle(
            color: Colors.grey.shade500,
            fontWeight: FontWeight.bold,
          ),
        ),

        const SizedBox(width: 8),

        // Ημερομηνία δημοσίευσης.
        Flexible(
          child: Text(
            post.publishedAt ?? '—',
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              color: Colors.grey.shade600,
              fontSize: 12,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ],
    );
  }

  // Εμφανίζει μικρή προεπισκόπηση του περιεχομένου.
  Widget _postBodyPreview() {
    return Text(
      post.body,
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
      style: TextStyle(
        color: Colors.grey.shade700,
        fontSize: 13,
        height: 1.35,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}
