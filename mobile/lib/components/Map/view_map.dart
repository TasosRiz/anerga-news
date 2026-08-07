import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

// Εμφανίζει μία αποθηκευμένη τοποθεσία στον χάρτη.
//
// Χρησιμοποιείται μόνο για προβολή
// και δεν επιτρέπει αλλαγή του σημείου.

class ViewMap extends StatelessWidget {
  const ViewMap({super.key, required this.lat, required this.lng});

  final double lat;
  final double lng;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 300,
      width: double.infinity,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: FlutterMap(
          options: MapOptions(initialCenter: LatLng(lat, lng), initialZoom: 15),
          children: [
            // Εμφανίζει τα tiles του χάρτη.
            TileLayer(
              urlTemplate:
                  'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
              userAgentPackageName: 'com.servicekit.app',
            ),

            // Εμφανίζει marker στο σημείο της αιτήματος.
            MarkerLayer(
              markers: [
                Marker(
                  point: LatLng(lat, lng),
                  width: 40,
                  height: 40,
                  child: const Icon(
                    Icons.location_on,
                    color: Colors.red,
                    size: 36,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
