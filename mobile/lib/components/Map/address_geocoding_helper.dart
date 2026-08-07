import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

// Μετατρέπει μία διεύθυνση σε συντεταγμένες.
//
// Χρησιμοποιεί το Nominatim API του OpenStreetMap
// και επιστρέφει latitude και longitude.

// Αποθηκεύει τις συντεταγμένες που επιστρέφει η αναζήτηση.
class AddressGeocodingResult {
  final double lat;
  final double lng;

  const AddressGeocodingResult({required this.lat, required this.lng});
}

class AddressGeocodingHelper {
  // Αναζητά μία διεύθυνση και επιστρέφει συντεταγμένες.
  static Future<AddressGeocodingResult> searchAddress({
    required String address,
    required String city,
    required String postalCode,
  }) async {
    // Ελέγχει ότι υπάρχουν τα βασικά στοιχεία της διεύθυνσης.
    if (address.trim().isEmpty || city.trim().isEmpty) {
      throw Exception('Συμπλήρωσε διεύθυνση και πόλη');
    }

    // Δημιουργεί το πλήρες κείμενο αναζήτησης.
    final query = [
      address.trim(),
      postalCode.trim(),
      city.trim(),
      'Greece',
    ].where((item) => item.isNotEmpty).join(', ');

    debugPrint('Search query: $query');

    // Δημιουργεί το URL αναζήτησης του Nominatim.
    final uri = Uri.https('nominatim.openstreetmap.org', '/search', {
      'format': 'jsonv2',
      'q': query,
      'limit': '1',
      'addressdetails': '1',
      'accept-language': 'el',
    });

    // Στέλνει το request στο OpenStreetMap.
    final response = await http.get(
      uri,
      headers: {'User-Agent': 'ServiceKit Flutter App'},
    );

    // Ελέγχει αν το request ολοκληρώθηκε σωστά.
    if (response.statusCode != 200) {
      throw Exception('Δεν ήταν δυνατή η εύρεση τοποθεσίας');
    }

    // Μετατρέπει το response body σε λίστα.
    final List data = jsonDecode(response.body);

    // Ελέγχει αν βρέθηκε αποτέλεσμα.
    if (data.isEmpty) {
      throw Exception('Δεν βρέθηκε η διεύθυνση');
    }

    // Παίρνει το πρώτο αποτέλεσμα της αναζήτησης.
    final result = data.first;

    // Μετατρέπει τις συντεταγμένες από String σε double.
    final lat = double.tryParse(result['lat'].toString());

    final lng = double.tryParse(result['lon'].toString());

    debugPrint('Found location: $lat, $lng');

    // Ελέγχει αν οι συντεταγμένες είναι έγκυρες.
    if (lat == null || lng == null) {
      throw Exception('Δεν βρέθηκαν σωστές συντεταγμένες');
    }

    // Επιστρέφει τις συντεταγμένες.
    return AddressGeocodingResult(lat: lat, lng: lng);
  }
}
