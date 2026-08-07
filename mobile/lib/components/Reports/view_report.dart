import 'package:flutter/material.dart';

// Config
import 'package:service_management_mobile/utils/config.dart';

// Widgets
import 'package:service_management_mobile/utils/Widgets/InfoRow/info_row.dart';
import 'package:service_management_mobile/components/Map/view_map.dart'; // Map
import 'package:service_management_mobile/utils/Widgets/Cards/app_card.dart'; // Cards

// API
import 'package:service_management_mobile/api/api_config.dart';
import 'package:service_management_mobile/components/Reports/model/report_model.dart';

// Helpers
import 'package:service_management_mobile/components/Reports/helper/report_helpers.dart';

// View Report
//
// Εμφανίζει όλες τις λεπτομέρειες μιας αιτήματος.
//
// Περιλαμβάνει:
// - φωτογραφία
// - κατηγορία
// - τίτλο
// - περιγραφή
// - κατάσταση
// - στοιχεία διεύθυνσης
// - τοποθεσία στον χάρτη

class ViewReport extends StatelessWidget {
  const ViewReport({super.key, required this.report});

  final ReportModel report;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Προβολή Αιτήματος'),
        backgroundColor: Config.primaryColor,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              // Εμφανίζει τη φωτογραφία μόνο αν υπάρχει.
              if (report.photo.isNotEmpty) ...[
                AppCard(child: _photoSection()),
                Config.spaceSmall,
              ],

              // Κατηγορία αιτήματος.
              AppCard(child: _categorySection()),
              Config.spaceSmall,

              // Τίτλος αιτήματος.
              AppCard(child: _titleSection()),
              Config.spaceSmall,

              // Περιγραφή αιτήματος.
              AppCard(child: _descSection()),
              Config.spaceSmall,

              // Κατάσταση αιτήματος.
              AppCard(child: _statusSection()),
              Config.spaceSmall,

              // Στοιχεία διεύθυνσης.
              AppCard(child: _addressSection()),
              Config.spaceSmall,

              // Τοποθεσία αιτήματος στον χάρτη.
              AppCard(child: _locationSection()),
            ],
          ),
        ),
      ),
    );
  }

  // Εμφανίζει τη φωτογραφία της αιτήματος.
  Widget _photoSection() {
    if (report.photo.isEmpty) {
      return const SizedBox.shrink();
    }

    // Δημιουργεί το πλήρες URL της φωτογραφίας.
    final photoUrl = report.photo.startsWith('http')
        ? report.photo
        : '${ApiConfig.baseUrl}/${report.photo}';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Φωτογραφία',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: Image.network(
            photoUrl,
            width: double.infinity,
            height: 220,
            fit: BoxFit.cover,

            // Εμφανίζει μήνυμα αν η φωτογραφία δεν φορτωθεί.
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
        ),
      ],
    );
  }

  // Εμφανίζει την κατηγορία της αιτήματος.
  Widget _categorySection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Κατηγορία',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
          decoration: BoxDecoration(
            color: Config.primaryColor,
            borderRadius: BorderRadius.circular(10),
          ),
          child: SizedBox(
            height: 50,
            child: Text(
              report.category?.name ?? '—',
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
          ),
        ),
      ],
    );
  }

  // Εμφανίζει τον τίτλο της αιτήματος.
  Widget _titleSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Τίτλος',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
          decoration: BoxDecoration(
            color: Colors.grey.shade200,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(
            report.title,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Colors.black,
            ),
          ),
        ),
      ],
    );
  }

  // Εμφανίζει την περιγραφή της αιτήματος.
  Widget _descSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Περιγραφή',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
          decoration: BoxDecoration(
            color: Colors.grey.shade200,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(
            report.description.isEmpty
                ? 'Δεν υπάρχει περιγραφή'
                : report.description,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
          ),
        ),
      ],
    );
  }

  // Εμφανίζει την κατάσταση της αιτήματος.
  Widget _statusSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Κατάσταση',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
          decoration: BoxDecoration(
            color: Colors.grey.shade200,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Text(
            formatStatus(report.status),
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: statusColor(report.status),
            ),
          ),
        ),
      ],
    );
  }

  // Εμφανίζει τα στοιχεία διεύθυνσης της αιτήματος.
  Widget _addressSection() {
    final address = report.address ?? '';
    final city = report.city ?? '';
    final postalCode = report.postalCode ?? '';

    // Ελέγχει αν υπάρχει τουλάχιστον ένα στοιχείο διεύθυνσης.
    final hasAddress =
        address.isNotEmpty || city.isNotEmpty || postalCode.isNotEmpty;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Διεύθυνση',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Config.spaceSmall,

        // Εμφανίζει empty state αν δεν υπάρχει διεύθυνση.
        if (!hasAddress)
          Text(
            'Δεν έχει δοθεί διεύθυνση',
            style: TextStyle(
              fontSize: 15,
              color: Colors.grey.shade600,
              fontWeight: FontWeight.w600,
            ),
          )
        else ...[
          // Οδός και αριθμός.
          InfoRow(
            icon: Icons.location_on_outlined,
            label: 'Οδός',
            value: address.isEmpty ? '—' : address,
          ),

          const SizedBox(height: 8),

          // Πόλη.
          InfoRow(
            icon: Icons.location_city_outlined,
            label: 'Πόλη',
            value: city.isEmpty ? '—' : city,
          ),

          const SizedBox(height: 8),

          // Ταχυδρομικός κώδικας.
          InfoRow(
            icon: Icons.local_post_office_outlined,
            label: 'Τ.Κ.',
            value: postalCode.isEmpty ? '—' : postalCode,
          ),
        ],
      ],
    );
  }

  // Εμφανίζει την τοποθεσία της αιτήματος στον χάρτη.
  Widget _locationSection() {
    // Ελέγχει αν υπάρχουν αποθηκευμένες συντεταγμένες.
    final hasLocation = report.lat.isNotEmpty && report.lng.isNotEmpty;

    // Μετατρέπει τις συντεταγμένες από String σε double.
    final lat = double.tryParse(report.lat);
    final lng = double.tryParse(report.lng);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Τοποθεσία',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),

        const SizedBox(height: 8),

        const Text('Σημείο της αιτήματος στον χάρτη'),

        const SizedBox(height: 12),

        // Εμφανίζει τον χάρτη αν οι συντεταγμένες είναι έγκυρες.
        if (hasLocation && lat != null && lng != null) ...[
          ViewMap(lat: lat, lng: lng),
          const SizedBox(height: 12),
        ] else
          const Text('Δεν έχει οριστεί τοποθεσία'),
      ],
    );
  }
}
