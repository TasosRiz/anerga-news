import 'dart:convert';
import 'package:http/http.dart' as http;

// API
import 'package:service_management_mobile/api/api_config.dart';
import 'package:service_management_mobile/components/Auth/api/auth_storage.dart';
import 'package:service_management_mobile/components/Posts/model/post_model.dart';

// Διαχειρίζεται την επικοινωνία με το backend
// για τις ανακοινώσεις.
//
// Περιλαμβάνει:
// - φόρτωση δημόσιων ανακοινώσεων
// - φόρτωση posts counts
//
// Δεν κρατά UI state, loading ή navigation.

class PostsApi {
  // Φορτώνει τις ενεργές δημόσιες ανακοινώσεις.
  static Future<List<PostModel>> fetchPublicPosts() async {
    final response = await http.get(
      Uri.parse('${ApiConfig.apiUrl}/public/posts'),
      headers: {'Accept': 'application/json'},
    );

    final body = jsonDecode(response.body);

    if (response.statusCode == 200 && body['data'] is List) {
      final List postsJson = body['data'];

      return postsJson.map((item) {
        return PostModel.fromJson(item);
      }).toList();
    }

    throw Exception(body['message'] ?? 'Αποτυχία φόρτωσης ανακοινώσεων');
  }

  // Φορτώνει τα συνολικά counts των ανακοινώσεων.
  static Future<PostsCountsModel> fetchPostsCounts() async {
    final token = await AuthStorage.token();

    final response = await http.get(
      Uri.parse('${ApiConfig.apiUrl}/posts/counts'),
      headers: {'Accept': 'application/json', 'Authorization': 'Bearer $token'},
    );

    final body = jsonDecode(response.body);

    if (response.statusCode == 200) {
      return PostsCountsModel.fromJson(body);
    }

    throw Exception(
      body['message'] ?? 'Αποτυχία φόρτωσης σύνοψης ανακοινώσεων',
    );
  }
}
