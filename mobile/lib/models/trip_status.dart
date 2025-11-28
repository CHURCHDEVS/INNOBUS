class TripStatus {
  final String status;
  final double? etaSeconds;
  final double? distanceRemainingMeters;
  final bool notificationTriggered;
  final String? message;

  TripStatus({
    required this.status,
    this.etaSeconds,
    this.distanceRemainingMeters,
    required this.notificationTriggered,
    this.message,
  });

  factory TripStatus.fromJson(Map<String, dynamic> json) {
    return TripStatus(
      status: json['status'],
      etaSeconds: json['eta_seconds']?.toDouble(),
      distanceRemainingMeters: json['distance_remaining_meters']?.toDouble(),
      notificationTriggered: json['notification_triggered'] ?? false,
      message: json['message'],
    );
  }
}
