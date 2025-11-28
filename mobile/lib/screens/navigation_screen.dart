import 'dart:async';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import '../services/tracking_service.dart';
import '../models/trip_status.dart';

class NavigationScreen extends StatefulWidget {
  final String tripId;
  final String targetStopId;

  const NavigationScreen({
    super.key,
    required this.tripId,
    required this.targetStopId,
  });

  @override
  State<NavigationScreen> createState() => _NavigationScreenState();
}

class _NavigationScreenState extends State<NavigationScreen> {
  final TrackingService _trackingService = TrackingService();
  final FlutterLocalNotificationsPlugin _notificationsPlugin = FlutterLocalNotificationsPlugin();
  
  int? _userTripId;
  TripStatus? _currentStatus;
  StreamSubscription<Position>? _positionStream;
  bool _isLoading = true;
  bool _hasPermission = false;

  @override
  void initState() {
    super.initState();
    _initializeNotifications();
    _checkPermissionsAndStart();
  }

  Future<void> _initializeNotifications() async {
    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    const InitializationSettings initializationSettings =
        InitializationSettings(android: initializationSettingsAndroid);
    await _notificationsPlugin.initialize(initializationSettings);
  }

  Future<void> _checkPermissionsAndStart() async {
    var status = await Permission.locationWhenInUse.request();
    if (status.isGranted) {
      setState(() => _hasPermission = true);
      _startNavigation();
    } else {
      // Handle permission denied
      setState(() => _isLoading = false);
    }
  }

  Future<void> _startNavigation() async {
    try {
      final id = await _trackingService.startTrip(widget.tripId, widget.targetStopId);
      setState(() {
        _userTripId = id;
        _isLoading = false;
      });

      _positionStream = Geolocator.getPositionStream(
        locationSettings: const LocationSettings(
          accuracy: LocationAccuracy.high,
          distanceFilter: 10,
        ),
      ).listen((Position position) {
        _sendLocationUpdate(position);
      });
    } catch (e) {
      print("Error starting navigation: $e");
      setState(() => _isLoading = false);
    }
  }

  Future<void> _sendLocationUpdate(Position position) async {
    if (_userTripId == null) return;

    try {
      final status = await _trackingService.updateLocation(
        _userTripId!,
        position.latitude,
        position.longitude,
        position.speed,
      );

      setState(() {
        _currentStatus = status;
      });

      if (status.notificationTriggered) {
        _showNotification();
      }
    } catch (e) {
      print("Error updating location: $e");
    }
  }

  Future<void> _showNotification() async {
    const AndroidNotificationDetails androidPlatformChannelSpecifics =
        AndroidNotificationDetails(
            'innobus_alerts', 'Trip Alerts',
            importance: Importance.max,
            priority: Priority.high,
            showWhen: false);
    const NotificationDetails platformChannelSpecifics =
        NotificationDetails(android: androidPlatformChannelSpecifics);
    await _notificationsPlugin.show(
        0, 'Prepárate para bajar', 'Tu parada está cerca (3 min)', platformChannelSpecifics,
        payload: 'item x');
  }

  @override
  void dispose() {
    _positionStream?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Cupertino-style / Waze-like UI
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: const Text("En Viaje", style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: !_hasPermission
          ? const Center(child: Text("Se requiere permiso de ubicación."))
          : _isLoading
              ? const Center(child: CupertinoActivityIndicator(radius: 20))
              : Column(
                  children: [
                    // Map Placeholder (Top Section)
                    Expanded(
                      flex: 2,
                      child: Container(
                        color: Colors.blue[50],
                        child: Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(Icons.map, size: 64, color: Colors.blue[200]),
                              const SizedBox(height: 10),
                              Text("Mapa de Navegación", style: TextStyle(color: Colors.blue[300])),
                            ],
                          ),
                        ),
                      ),
                    ),
                    // Bottom Sheet (Waze Style)
                    Container(
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(24),
                          topRight: Radius.circular(24),
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black12,
                            blurRadius: 10,
                            offset: Offset(0, -5),
                          ),
                        ],
                      ),
                      padding: const EdgeInsets.all(24.0),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          // Handle bar
                          Container(
                            width: 40,
                            height: 4,
                            decoration: BoxDecoration(
                              color: Colors.grey[300],
                              borderRadius: BorderRadius.circular(2),
                            ),
                          ),
                          const SizedBox(height: 24),
                          
                          // Status & ETA
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    _currentStatus?.etaSeconds != null 
                                      ? "${(_currentStatus!.etaSeconds! / 60).ceil()} min"
                                      : "-- min",
                                    style: const TextStyle(
                                      fontSize: 32,
                                      fontWeight: FontWeight.w800,
                                      color: Colors.green,
                                      letterSpacing: -1,
                                    ),
                                  ),
                                  const Text(
                                    "Tiempo estimado",
                                    style: TextStyle(color: Colors.grey, fontSize: 14),
                                  ),
                                ],
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                decoration: BoxDecoration(
                                  color: _currentStatus?.notificationTriggered == true 
                                    ? Colors.red[50] 
                                    : Colors.blue[50],
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Row(
                                  children: [
                                    Icon(
                                      _currentStatus?.notificationTriggered == true 
                                        ? Icons.notifications_active 
                                        : Icons.directions_bus,
                                      color: _currentStatus?.notificationTriggered == true 
                                        ? Colors.red 
                                        : Colors.blue,
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      _currentStatus?.distanceRemainingMeters != null
                                        ? "${(_currentStatus!.distanceRemainingMeters!).toStringAsFixed(0)} m"
                                        : "-- m",
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        color: _currentStatus?.notificationTriggered == true 
                                          ? Colors.red 
                                          : Colors.blue,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          
                          const SizedBox(height: 24),
                          
                          // Progress Bar
                          ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: LinearProgressIndicator(
                              value: 0.7, // Mock progress
                              backgroundColor: Colors.grey[200],
                              valueColor: const AlwaysStoppedAnimation<Color>(Colors.green),
                              minHeight: 8,
                            ),
                          ),
                          
                          const SizedBox(height: 24),
                          
                          // Action Button
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () {
                                // Stop navigation
                                Navigator.pop(context);
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.red[50],
                                foregroundColor: Colors.red,
                                elevation: 0,
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(16),
                                ),
                              ),
                              child: const Text(
                                "Terminar Viaje",
                                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
    );
  }
}
