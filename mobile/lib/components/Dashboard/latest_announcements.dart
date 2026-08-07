import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Widgets
import 'package:service_management_mobile/components/Dashboard/Section_title.dart';
import 'package:service_management_mobile/components/Posts/PostCard/post_card.dart';
import 'package:service_management_mobile/utils/Widgets/Cards/app_card.dart';

// Providers
import 'package:service_management_mobile/components/Posts/provider/posts_provider.dart';

// Posts
import 'package:service_management_mobile/components/Posts/view_post.dart';

// Εμφανίζει τις τελευταίες δημόσιες ανακοινώσεις.
//
// Τα δεδομένα προέρχονται από το PostsProvider.
//
// Διαχειρίζεται:
// - loading
// - error message
// - empty state
// - navigation στις λεπτομέρειες της ανακοίνωσης

class LatestAnnouncements extends StatelessWidget {
  final int limit;

  const LatestAnnouncements({super.key, this.limit = 3});

  @override
  Widget build(BuildContext context) {
    // Παρακολουθεί τις αλλαγές του PostsProvider.
    final postsProvider = context.watch<PostsProvider>();

    // Κρατά μόνο τις τελευταίες ανακοινώσεις.
    final visiblePosts = postsProvider.latestPosts(limit: limit);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionTitle(title: 'Νέες Ανακοινώσεις'),

        const SizedBox(height: 12),

        // Εμφανίζει loading όσο φορτώνονται τα posts.
        if (postsProvider.loading)
          const Center(child: CircularProgressIndicator())
        // Εμφανίζει μήνυμα λάθους.
        else if (postsProvider.errorMessage.isNotEmpty)
          AppCard(
            child: Text(
              postsProvider.errorMessage,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.red,
                fontWeight: FontWeight.w700,
              ),
            ),
          )
        // Empty state όταν δεν υπάρχουν ανακοινώσεις.
        else if (visiblePosts.isEmpty)
          AppCard(
            child: Text(
              'Δεν υπάρχουν ανακοινώσεις',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.grey.shade600,
                fontWeight: FontWeight.w700,
              ),
            ),
          )
        // Εμφανίζει τις τελευταίες ανακοινώσεις.
        else
          Column(
            children: visiblePosts.map((post) {
              return PostCard(
                post: post,
                compact: true,
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => ViewPost(post: post)),
                  );
                },
              );
            }).toList(),
          ),
      ],
    );
  }
}
