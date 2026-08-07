// Περιλαμβάνει:
// - κατηγορία αιτήματος
// - χρήστη αιτήματος
// - βασικά στοιχεία αιτήματος
// - counts αιτημάτων
//
// Τα factory constructors μετατρέπουν
// τα JSON δεδομένα του API σε Dart objects.

// Category
class ReportCategoryModel {
  final int id;
  final String name;

  const ReportCategoryModel({required this.id, required this.name});

  factory ReportCategoryModel.fromJson(Map<String, dynamic> json) {
    return ReportCategoryModel(
      id: _parseInt(json['id']),
      name: json['name']?.toString() ?? '',
    );
  }
}

// User
class ReportUserModel {
  final int id;
  final String name;
  final String email;
  final String role;
  final String status;

  const ReportUserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    required this.status,
  });

  factory ReportUserModel.fromJson(Map<String, dynamic> json) {
    return ReportUserModel(
      id: _parseInt(json['id']),
      name: json['name']?.toString() ?? '',
      email: json['email']?.toString() ?? '',
      role: json['role']?.toString() ?? '',
      status: json['status']?.toString() ?? '',
    );
  }
}

// Report
class ReportModel {
  final int id;
  final String title;
  final String description;

  final String? address;
  final String? city;
  final String? postalCode;

  final int categoryId;
  final int userId;

  final String status;
  final String createdAt;
  final String updatedAt;

  final String lat;
  final String lng;
  final String photo;

  final ReportCategoryModel? category;
  final ReportUserModel? user;

  const ReportModel({
    required this.id,
    required this.title,
    required this.description,
    required this.address,
    required this.city,
    required this.postalCode,
    required this.categoryId,
    required this.userId,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    required this.lat,
    required this.lng,
    required this.photo,
    required this.category,
    required this.user,
  });

  factory ReportModel.fromJson(Map<String, dynamic> json) {
    return ReportModel(
      id: _parseInt(json['id']),
      title: json['title']?.toString() ?? '',
      description: json['description']?.toString() ?? '',

      address: json['address']?.toString(),
      city: json['city']?.toString(),
      postalCode: json['postal_code']?.toString(),

      categoryId: _parseInt(json['category_id']),
      userId: _parseInt(json['user_id']),

      status: json['status']?.toString() ?? '',
      createdAt: json['created_at']?.toString() ?? '',
      updatedAt: json['updated_at']?.toString() ?? '',

      lat: json['lat']?.toString() ?? '',
      lng: json['lng']?.toString() ?? '',
      photo: json['photo']?.toString() ?? '',

      category: _parseCategory(json['category']),
      user: _parseUser(json['user']),
    );
  }
}

// Report Counts
class ReportCountsModel {
  final int newReports;
  final int inProgress;
  final int solved;

  const ReportCountsModel({
    required this.newReports,
    required this.inProgress,
    required this.solved,
  });

  // Επιστρέφει το συνολικό πλήθος αιτημάτων.
  int get total => newReports + inProgress + solved;

  factory ReportCountsModel.fromJson(Map<String, dynamic> json) {
    return ReportCountsModel(
      newReports: _parseInt(json['new']),
      inProgress: _parseInt(json['in_progress']),
      solved: _parseInt(json['solved']),
    );
  }
}

// Μετατρέπει με ασφάλεια οποιαδήποτε τιμή σε int.
int _parseInt(dynamic value) {
  if (value is int) {
    return value;
  }

  return int.tryParse(value?.toString() ?? '') ?? 0;
}

// Μετατρέπει το category JSON σε model.
ReportCategoryModel? _parseCategory(dynamic value) {
  if (value is Map) {
    return ReportCategoryModel.fromJson(Map<String, dynamic>.from(value));
  }

  return null;
}

// Μετατρέπει το user JSON σε model.
ReportUserModel? _parseUser(dynamic value) {
  if (value is Map) {
    return ReportUserModel.fromJson(Map<String, dynamic>.from(value));
  }

  return null;
}
