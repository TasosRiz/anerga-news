import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

// Gia Create kai Edit
class MapPicker extends StatefulWidget {
  const MapPicker({
    super.key,
    this.lat,
    this.lng,
    required this.onLocationSelected,
  });

  final double? lat;
  final double? lng;
  final Function(double lat, double lng) onLocationSelected;

  @override
  State<MapPicker> createState() => _MapPickerState();
}

class _MapPickerState extends State<MapPicker> {
  final MapController mapController = MapController();

  LatLng? selectedPosition;

  @override
  void initState() {
    super.initState();

    if (widget.lat != null && widget.lng != null) {
      selectedPosition = LatLng(widget.lat!, widget.lng!);
    }
  }

  @override
  void didUpdateWidget(covariant MapPicker oldWidget) {
    super.didUpdateWidget(oldWidget);

    final latChanged = widget.lat != oldWidget.lat;
    final lngChanged = widget.lng != oldWidget.lng;

    if (widget.lat != null &&
        widget.lng != null &&
        (latChanged || lngChanged)) {
      final newPosition = LatLng(widget.lat!, widget.lng!);

      setState(() {
        selectedPosition = newPosition;
      });

      mapController.move(newPosition, 16);
    }
  }

  @override
  Widget build(BuildContext context) {
    final center = selectedPosition ?? const LatLng(37.9838, 23.7275);

    return SizedBox(
      height: 400,
      width: double.infinity,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: FlutterMap(
          mapController: mapController,
          options: MapOptions(
            initialCenter: center,
            initialZoom: selectedPosition == null ? 13 : 16,
            onTap: (tapPosition, point) {
              setState(() {
                selectedPosition = point;
              });

              widget.onLocationSelected(point.latitude, point.longitude);
            },
          ),
          children: [
            TileLayer(
              urlTemplate:
                  'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
              userAgentPackageName: 'com.servicekit.app',
            ),

            if (selectedPosition != null)
              MarkerLayer(
                markers: [
                  Marker(
                    point: selectedPosition!,
                    width: 40,
                    height: 40,
                    child: const Icon(
                      Icons.location_pin,
                      color: Colors.red,
                      size: 40,
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
