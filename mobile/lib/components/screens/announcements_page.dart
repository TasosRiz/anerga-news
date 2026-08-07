import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Widgets
import 'package:service_management_mobile/components/Posts/PostCard/post_card.dart';
import 'package:service_management_mobile/utils/Widgets/Cards/app_card.dart';

// Actions
import 'package:service_management_mobile/components/Posts/view_post.dart';

// API
import 'package:service_management_mobile/components/Posts/provider/posts_provider.dart';

// Config
import 'package:service_management_mobile/utils/config.dart';

// Εμφανίζει όλες τις ενεργές ανακοινώσεις.
//
// Περιλαμβάνει:
// - φόρτωση posts από το PostsProvider
// - refresh action
// - loading state
// - error state
// - empty state
// - navigation στο ViewPost

class AnnouncementsPage extends StatefulWidget {
  const AnnouncementsPage({super.key});

  @override
  State<AnnouncementsPage> createState() => _AnnouncementsPageState();
}

class _AnnouncementsPageState extends State<AnnouncementsPage> {
  @override
  void initState() {
    super.initState();

    // Φορτώνει τις δημόσιες ανακοινώσεις.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<PostsProvider>().fetchPublicPosts();
    });
  }

  @override
  Widget build(BuildContext context) {
    final postsProvider = context.watch<PostsProvider>();
    final posts = postsProvider.activePosts;

    return Scaffold(
      backgroundColor: Config.cityBg,
      appBar: AppBar(
        title: const Text('Ανακοινώσεις'),
        backgroundColor: Config.cityNavy,
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              context.read<PostsProvider>().fetchPublicPosts();
            },
          ),
        ],
      ),
      body: SafeArea(child: _body(postsProvider, posts)),
    );
  }

  Widget _body(PostsProvider postsProvider, List posts) {
    if (postsProvider.loading) {
      return const Center(child: CircularProgressIndicator());
    }

    // Εμφανίζει μήνυμα σφάλματος
    if (postsProvider.errorMessage.isNotEmpty) {
      return Padding(
        padding: const EdgeInsets.all(16),
        child: AppCard(
          child: Text(
            postsProvider.errorMessage,
            style: const TextStyle(
              color: Colors.red,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      );
    }

    // Εμφανίζει empty state αν δεν υπάρχουν ανακοινώσεις.
    if (posts.isEmpty) {
      return _emptyState();
    }

    return ListView(
      padding: const EdgeInsets.all(16),
      children: posts.map((post) {
        return PostCard(
          post: post,
          onTap: () {
            // Ανοίγει τις λεπτομέρειες της ανακοίνωσης.
            Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => ViewPost(post: post)),
            );
          },
        );
      }).toList(),
    );
  }

  Widget _emptyState() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: AppCard(
        child: Column(
          children: [
            Icon(
              Icons.campaign_outlined,
              size: 44,
              color: Colors.grey.shade400,
            ),
            const SizedBox(height: 10),
            Text(
              'Δεν υπάρχουν διαθέσιμες ανακοινώσεις',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.grey.shade600,
                fontSize: 14,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
