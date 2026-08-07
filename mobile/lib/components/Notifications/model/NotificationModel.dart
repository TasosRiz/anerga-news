class Notificationmodel {
  final int id;
  final String title;
  final String message;
  final String type;
  final bool unread;
  final DateTime? created_at;
  final String? sourceType;
  final int? sourceId;

  const Notificationmodel({
    required this.id,
    required this.title,
    required this.message,
    required this.type,
    required this.unread,
    this.created_at,
    this.sourceType,
    this.sourceId,
  });

  factory Notificationmodel.fromJson(Map<String, dynamic> json) {
    final pivot = json['pivot'];

    return Notificationmodel(
      id: json['id'] ?? 0,
      title: json['title'] ?? '',
      message: json['message'] ?? '',
      type: json['type'] ?? 'info',
      sourceType: json['source_type'],
      sourceId: json['source_id'],

      // Αν το read_at είναι null, θεωρείται unread.
      unread: pivot?['read_at'] == null,

      created_at: json['created_at'] != null
          ? DateTime.tryParse(json['created_at'].toString())
          : null,
    );
  }
}
