// Post Models

// Περιλαμβάνει:
// - model κατηγορίας ανακοίνωσης
// - model ανακοίνωσης
// - model για τα συνολικά counts των ανακοινώσεων

// Post Category Model
//
// Μετατρέπει τα δεδομένα κατηγορίας
// από JSON σε Dart object.

class PostCategoryModel {
  final int id;
  final String name;
  final int status;

  const PostCategoryModel({
    required this.id,
    required this.name,
    required this.status,
  });

  factory PostCategoryModel.fromJson(Map<String, dynamic> json) {
    return PostCategoryModel(
      id: json['id'] ?? 0,
      name: json['name']?.toString() ?? '',
      status: int.tryParse(json['status'].toString()) ?? 0,
    );
  }
}

// Post Model
//
// Αποθηκεύει τα βασικά στοιχεία μιας ανακοίνωσης
// και τα μετατρέπει από JSON σε Dart object.

class PostModel {
  final int id;
  final String title;
  final String status;
  final String? publishedAt;
  final String body;
  final String? photo;

  final int? categoryId;
  final PostCategoryModel? category;

  const PostModel({
    required this.id,
    required this.title,
    required this.status,
    required this.publishedAt,
    required this.body,
    required this.photo,
    required this.categoryId,
    required this.category,
  });

  factory PostModel.fromJson(Map<String, dynamic> json) {
    return PostModel(
      id: json['id'] ?? 0,
      title: json['title']?.toString() ?? '',
      status: json['status']?.toString() ?? '',
      publishedAt: json['published_at']?.toString(),
      body: json['body']?.toString() ?? '',
      photo: json['photo']?.toString(),

      // Σύνδεση της ανακοίνωσης με την κατηγορία.
      categoryId: json['category_id'] != null
          ? int.tryParse(json['category_id'].toString())
          : null,

      // Δημιουργεί CategoryModel μόνο αν υπάρχει category object.
      category: json['category'] is Map<String, dynamic>
          ? PostCategoryModel.fromJson(json['category'])
          : null,
    );
  }
}

// Posts Counts Model
//
// Αποθηκεύει τα συνολικά στατιστικά
// των ανακοινώσεων.

class PostsCountsModel {
  final int total;
  final int active;
  final int inactive;
  final int newPosts;

  const PostsCountsModel({
    required this.total,
    required this.active,
    required this.inactive,
    required this.newPosts,
  });

  factory PostsCountsModel.fromJson(Map<String, dynamic> json) {
    return PostsCountsModel(
      total: int.tryParse(json['total'].toString()) ?? 0,
      active: int.tryParse(json['active'].toString()) ?? 0,
      inactive: int.tryParse(json['inactive'].toString()) ?? 0,
      newPosts: int.tryParse(json['new'].toString()) ?? 0,
    );
  }
}
