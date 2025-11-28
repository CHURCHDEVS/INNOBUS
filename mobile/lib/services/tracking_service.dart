import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/trip_status.dart';

class TrackingService {
  // TODO: Use actual backend URL (10.0.2.2 for Android emulator localhost)
  final String baseUrl = "http://10.0.2.2:8000/tracking";

  Future<int> startTrip(String tripId, String targetStopId) async {
    final response = await http.post(
      Uri.parse('$baseUrl/start'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'trip_id': tripId,
        'target_stop_id': targetStopId,
      }),
    );

    if (response.statusCode == 200) {
      return int.parse(response.body);
    } else {
      throw Exception('Failed to start trip');
    }
  }

  Future<TripStatus> updateLocation(int userTripId, double lat, double lon, double speed) async {
    final response = await http.post(
      Uri.parse('$baseUrl/update/$userTripId'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'lat': lat,
        'lon': lon,
        'speed': speed,
        'timestamp': DateTime.now().toIso8601String(),
      }),
    );

    if (response.statusCode == 200) {
      return TripStatus.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to update location');
    }
  }
}
