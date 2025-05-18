import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useBatteryStatus } from "../../hooks/useBatteryStatus"; // adjust path if needed

const STATION_COORDS = [
  {
    latitude: -25.556362273942632,
    longitude: 28.044523579889052,
    title: "Hebron Mall",
    address: "2nd Avenue, Akasia, 0182",
    ports: 50,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipP_nqrgpaQjE6Yk46K7fL4P-lLGKLq1Ey4GgzY=w408-h272-k-no",
  },
  {
    latitude: -25.670162509071833,
    longitude: 28.110028937564845,
    title: "Wonderpark Mall",
    address: "Heinrich Ave, Karenpark, Pretoria, 0118",
    ports: 25,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipPZY3GpVt7ibjkZuQfuwd4NiHVUbhlCnEvdjWhY=s680-w680-h510",
  },
];

export default function DashboardScreen() {
  // Assume useBatteryStatus returns these fields
  const { batteryLevel, estimatedTimeLeft, charging, batteryHealth } =
    useBatteryStatus();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");
      if (status === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="menu" size={28} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Hello{"\n"}
            <Text style={styles.userName}>John Doe</Text>
          </Text>
          <TouchableOpacity>
            <Ionicons name="search" size={26} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Battery Card */}
        <View style={styles.batteryCard}>
          <View style={styles.batteryIconContainer}>
            <MaterialCommunityIcons
              name={charging ? "battery-charging-60" : "battery-60"}
              size={48}
              color="#4ADE80"
            />
          </View>
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={styles.batteryLabel}>Battery Level</Text>
            <Text style={styles.batteryPercent}>
              {batteryLevel !== null
                ? `${Math.round(batteryLevel * 100)}%`
                : "--"}
            </Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Time to full</Text>
            <Text style={styles.statValue}>
              {charging
                ? estimatedTimeLeft
                  ? estimatedTimeLeft
                  : "Calculating..."
                : "Not Charging"}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Health</Text>
            <Text style={styles.statValue}>
              {" "}
              {batteryHealth
                ? batteryHealth.charAt(0).toUpperCase() + batteryHealth.slice(1)
                : "--"}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Status</Text>
            <Text style={styles.statValue}>
              {charging == null ? "" : charging ? "Charging" : "Not Charging"}
            </Text>
          </View>
        </View>

        {/* Nearby Station */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Charging Stations</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bigStationCard}>
          <View
            style={{
              flex: 1,
              borderRadius: 12,
              overflow: "hidden",
              width: "100%",
              height: 400,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!mapLoaded && (
              <Text style={{ color: "#6B7280" }}>Loading map...</Text>
            )}
            <MapView
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: mapLoaded ? 1 : 0,
              }}
              mapType="satellite"
              initialRegion={{
                latitude: location?.latitude || STATION_COORDS[0].latitude,
                longitude: location?.longitude || STATION_COORDS[0].longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              showsUserLocation={!!location}
              onMapReady={() => setMapLoaded(true)}
              loadingEnabled
              pitchEnabled={true}
              rotateEnabled={true}
              showsBuildings={true}
              showsCompass={true}
              camera={{
                center: {
                  latitude: location?.latitude || STATION_COORDS[0].latitude,
                  longitude: location?.longitude || STATION_COORDS[0].longitude,
                },
                pitch: 60, // tilt for 3D effect
                heading: 0,
                altitude: 1000,
                zoom: 16,
              }}
            >
              {/* User marker (optional, since showsUserLocation shows a blue dot) */}
              {location && (
                <Marker
                  coordinate={location}
                  title="You are here"
                  pinColor="#22C55E"
                />
              )}
              {/* Station markers */}
              {STATION_COORDS.map((station, idx) => (
                <Marker
                  key={idx}
                  coordinate={{
                    latitude: station.latitude,
                    longitude: station.longitude,
                  }}
                  title={station.title}
                  description={station.address}
                />
              ))}
            </MapView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerTitle: {
    color: "#222",
    fontSize: 18,
    fontWeight: "400",
    flex: 1,
    textAlign: "center",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#222",
  },
  batteryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6FCF9",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },
  batteryIconContainer: {
    backgroundColor: "#E9F9F0",
    borderRadius: 12,
    padding: 10,
  },
  batteryLabel: {
    color: "#6B7280",
    fontSize: 14,
  },
  batteryPercent: {
    color: "#222",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 2,
  },
  batteryMeta: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  statBox: {
    backgroundColor: "#F6FCF9",
    borderRadius: 14,
    padding: 14,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statLabel: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#222",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    color: "#22C55E",
    fontSize: 14,
    fontWeight: "500",
  },
  stationCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignSelf: "center",
    minHeight: 140,
  },
  bigStationCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 0,
    marginBottom: 20,
    minHeight: 570,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    justifyContent: "center",
  },
  stationRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  ratingText: {
    color: "#22C55E",
    marginLeft: 4,
    fontWeight: "bold",
    fontSize: 13,
  },
  stationName: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  stationAddress: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 6,
  },
  stationDistance: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 13,
  },
});
