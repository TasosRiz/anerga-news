import 'package:flutter/material.dart';

// API
import 'package:service_management_mobile/components/Posts/api/posts_api.dart';
import 'package:service_management_mobile/components/Posts/model/post_model.dart';

// Διαχειρίζεται το state των ανακοινώσεων.
//
// Περιλαμβάνει:
// - λίστα posts
// - loading state
// - error messages
// - ενεργές ανακοινώσεις
// - τελευταίες ανακοινώσεις
// - posts counts
//
// Δεν περιέχει UI ή navigation.

class PostsProvider extends ChangeNotifier {
  // Λίστα ανακοινώσεων.
  List<PostModel> posts = [];

  bool loading = false;
  String errorMessage = '';

  // Posts counts.
  PostsCountsModel? counts;
  bool countsLoading = false;
  String countsErrorMessage = '';

  // Φορτώνει τις δημόσιες ανακοινώσεις.
  Future<void> fetchPublicPosts() async {
    loading = true;
    errorMessage = '';
    notifyListeners();

    try {
      posts = await PostsApi.fetchPublicPosts();
    } catch (e) {
      errorMessage = e.toString().replaceFirst('Exception: ', '');
    } finally {
      loading = false;
      notifyListeners();
    }
  }

  // Επιστρέφει μόνο τις ενεργές ανακοινώσεις.
  List<PostModel> get activePosts {
    return posts.where((post) => post.status == 'active').toList();
  }

  // Επιστρέφει τις τελευταίες ενεργές ανακοινώσεις.
  List<PostModel> latestPosts({int limit = 3}) {
    return activePosts.take(limit).toList();
  }

  // Φορτώνει τα συνολικά counts των ανακοινώσεων.
  Future<void> loadPostsCounts() async {
    countsLoading = true;
    countsErrorMessage = '';
    notifyListeners();

    try {
      counts = await PostsApi.fetchPostsCounts();
    } catch (e) {
      countsErrorMessage = e.toString().replaceFirst('Exception: ', '');
    } finally {
      countsLoading = false;
      notifyListeners();
    }
  }
}
