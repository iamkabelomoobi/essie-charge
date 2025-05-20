import SideNav from "@/components/SideNav";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useBatteryStatus } from "../../hooks/useBatteryStatus";

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
  const { batteryLevel, estimatedTimeLeft, charging, batteryHealth } =
    useBatteryStatus();
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen to the left

  const onClose = () => {
    setSideNavVisible(false);
    setVisible(false);
  };

  useEffect(() => {
    if (sideNavVisible) {
      setVisible(true); // Show modal when sideNavVisible is true
      Animated.timing(slideAnim, {
        toValue: 0, // Slide in to 0 (fully visible)
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300, // Slide back out to the left
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setVisible(false)); // Hide modal after animation
    }
  }, [sideNavVisible]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
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
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setSideNavVisible(true)}>
            <Ionicons name="menu" size={28} color="#222" />
          </TouchableOpacity>
          <View
            style={[
              styles.headerTitleContainer,
              { backgroundColor: charging ? "#22cc5e" : "#111" },
            ]}
          >
            <Text style={styles.headerTitle}>
              {charging == null ? "" : charging ? "Charging" : "Not Charging"}
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="search" size={26} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Battery Gauge Card */}
        <View style={styles.batteryCard}>
          <View style={styles.gaugeCircle}>
            <Text style={styles.gaugePercent}>
              {batteryLevel !== null
                ? `${Math.round(batteryLevel * 100)}%`
                : "--"}
            </Text>
            <Text style={styles.gaugeLabel}>Optimal charging</Text>
          </View>
        </View>

        {/* Battery Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Battery Health</Text>
            <Text style={styles.statsValue}>
              {batteryHealth
                ? batteryHealth.charAt(0).toUpperCase() + batteryHealth.slice(1)
                : "--"}
            </Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>Time to full</Text>
            <Text style={styles.statsValue}>
              {charging
                ? estimatedTimeLeft
                  ? estimatedTimeLeft
                  : "Calculating..."
                : "Not Charging"}
            </Text>
          </View>
        </View>

        {/* Map */}
        <View style={styles.mapCard}>
          {!mapLoaded && (
            <Text style={{ color: "#6B7280", textAlign: "center" }}>
              Loading map...
            </Text>
          )}
          <MapView
            style={styles.map}
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
              pitch: 60,
              heading: 0,
              altitude: 1000,
              zoom: 16,
            }}
          >
            {location && (
              <Marker
                coordinate={location}
                title="You are here"
                pinColor="#22C55E"
              />
            )}
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

        {/* Nearby Station */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Stations</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(dashboard)/MapScreen");
            }}
          >
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={STATION_COORDS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ paddingLeft: 2, paddingBottom: 84 }}
          renderItem={({ item }) => (
            <View style={styles.stationCard}>
              <Image source={{ uri: item.image }} style={styles.stationImg} />
              <View style={{ flex: 1 }}>
                <Text style={styles.stationName}>{item.title}</Text>
                <Text style={styles.stationAddress}>{item.address}</Text>
                <Text style={styles.stationDistance}>{item.ports} ports</Text>
              </View>
            </View>
          )}
        />
        {/* SideNav Modal */}
        <Modal
          visible={visible}
          transparent
          animationType="none"
          onRequestClose={onClose}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.18)",
            }}
            activeOpacity={1}
            onPress={onClose}
          />
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 300,
              transform: [{ translateX: slideAnim }],
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: { width: 2, height: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <SideNav onClose={onClose} />
          </Animated.View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 0,
  },
  headerTitleContainer: {
    flex: 1,
    backgroundColor: "#22cc5e",
    borderRadius: 18,
    marginHorizontal: 55,
    paddingVertical: 6,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#22C55E",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  batteryCard: {
    alignItems: "center",
    backgroundColor: "#161c1b",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  gaugeCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    borderColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222d2a",
    marginBottom: 8,
  },
  gaugePercent: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  gaugeLabel: {
    color: "#b0f5d6",
    fontSize: 16,
    marginTop: 6,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: "#F6FCF9",
    borderRadius: 16,
    padding: 20,
    flex: 1,
    marginHorizontal: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  statsLabel: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 4,
  },
  statsValue: {
    color: "#222",
    fontSize: 20,
    fontWeight: "bold",
  },
  mapCard: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 5,
    marginBottom: 18,
    minHeight: 250,
    height: 250,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
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
    backgroundColor: "#F6FCF9",
    borderRadius: 16,
    padding: 10,
    width: 220,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  stationImg: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  stationName: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
  },
  stationAddress: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 6,
  },
  stationDistance: {
    color: "#22C55E",
    fontWeight: "bold",
    fontSize: 13,
  },
});
