// Μετατρέπει τα δεδομένα κατηγορίας
// από JSON σε Dart object.
class CategoryModel {
  final int id;
  final String name;
  final int? status;

  const CategoryModel({required this.id, required this.name, this.status});

  factory CategoryModel.fromJson(Map<String, dynamic> json) {
    return CategoryModel(
      id: _parseInt(json['id']),
      name: json['name']?.toString() ?? '',
      status: _parseNullableInt(json['status']),
    );
  }
}

// Μετατρέπει μία τιμή σε int.
int _parseInt(dynamic value) {
  if (value is int) {
    return value;
  }

  return int.tryParse(value?.toString() ?? '') ?? 0;
}

// Μετατρέπει μία προαιρετική τιμή σε int.
int? _parseNullableInt(dynamic value) {
  if (value == null) {
    return null;
  }

  if (value is int) {
    return value;
  }

  return int.tryParse(value.toString());
}
