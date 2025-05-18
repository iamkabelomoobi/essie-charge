import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useStationDistance } from "../../hooks/useStationDistance";
import { useUserLocation } from "../../hooks/useUserLocation";

const STATIONS = [
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

const openDirections = (station: (typeof STATIONS)[0]) => {
  const { latitude, longitude, title } = station;
  const label = encodeURIComponent(title);
  let url = "";

  if (Platform.OS === "ios") {
    url = `http://maps.apple.com/?daddr=${latitude},${longitude}&dirflg=d`;
  } else {
    url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
  }

  Linking.openURL(url);
};

const MapScreen: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const userLocation = useUserLocation();
  const distance = useStationDistance(userLocation, selectedStation);

  const mapRef = useRef<MapView>(null);

  const filteredStations =
    search.length > 0
      ? STATIONS.filter(
          (station) =>
            station.title.toLowerCase().includes(search.toLowerCase()) ||
            station.address.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  const handleSuggestionPress = (station: (typeof STATIONS)[0]) => {
    setSelectedStation(station);
    setSearch(station.title);
    setModalVisible(true);
    Keyboard.dismiss();
    // Animate to region
    mapRef.current?.animateToRegion(
      {
        latitude: station.latitude,
        longitude: station.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      800
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Floating Search Bar */}
      <View style={styles.floatingSearchBarContainer}>
        <View style={styles.searchBarRow}>
          <View style={styles.searchBarContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#6B7280"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Search here"
              placeholderTextColor="#6B7280"
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {search.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearch("")}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Suggestions Dropdown */}
        {search.length > 0 && filteredStations.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={filteredStations}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSuggestionPress(item)}
                >
                  <Text style={styles.suggestionText}>{item.title}</Text>
                  <Text style={styles.suggestionAddress}>{item.address}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mapContainer}>
          {!mapLoaded && (
            <View style={styles.mapLoader}>
              <ActivityIndicator size="large" color="#22C55E" />
              <Text style={{ color: "#6B7280", marginTop: 8 }}>
                Loading map...
              </Text>
            </View>
          )}
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            mapType="satellite"
            initialRegion={{
              latitude: userLocation?.latitude || STATIONS[0].latitude,
              longitude: userLocation?.longitude || STATIONS[0].longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            onMapReady={() => setMapLoaded(true)}
            pitchEnabled
            rotateEnabled
            showsBuildings
            showsCompass
            showsUserLocation={!!userLocation}
            camera={{
              center: {
                latitude: userLocation?.latitude || STATIONS[0].latitude,
                longitude: userLocation?.longitude || STATIONS[0].longitude,
              },
              pitch: 60,
              heading: 0,
              altitude: 1000,
              zoom: 16,
            }}
          >
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="Your Location"
                pinColor="#22C55E"
              />
            )}
            {STATIONS.map((station, idx) => (
              <Marker
                key={idx}
                coordinate={{
                  latitude: station.latitude,
                  longitude: station.longitude,
                }}
                title={station.title}
                description={station.address}
                onPress={() => {
                  setSelectedStation(station);
                  setModalVisible(true);
                }}
                pinColor="red"
              />
            ))}
          </MapView>
        </View>
      </TouchableWithoutFeedback>
      {/* Modal for station details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.cardModal}>
            <Image
              source={{ uri: selectedStation.image }}
              style={styles.image}
            />
            <Text style={styles.stationTitle}>{selectedStation.title}</Text>
            <Text style={styles.stationAddress}>{selectedStation.address}</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="location-outline" size={18} color="#22C55E" />
                <Text style={styles.infoText}>{distance || "--"}</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons
                  name="battery-charging-outline"
                  size={18}
                  color="#22C55E"
                />
                <Text style={styles.infoText}>
                  {selectedStation.ports} Charging Ports
                </Text>
              </View>
            </View>
            {/* Directions Button */}
            <TouchableOpacity
              style={styles.directionsButton}
              onPress={() => openDirections(selectedStation)}
              activeOpacity={0.85}
            >
              <Ionicons
                name="navigate"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.directionsButtonText}>Get Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-circle" size={32} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  floatingSearchBarContainer: {
    position: "absolute",
    top: 24,
    left: 0,
    right: 0,
    zIndex: 20,
    alignItems: "center",
  },
  searchBarRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center", // Center the search bar
    paddingHorizontal: 0, // Remove extra padding
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    height: 34,
    marginTop: -9,
    width: "92%", // Set width to 92% of the screen
    maxWidth: 270, // Optional: limit max width for large screens
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  searchBar: {
    flex: 1,
    height: 44,
    backgroundColor: "transparent",
    color: "#222",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  clearButton: {
    marginRight: 10,
  },
  mapContainer: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    backgroundColor: "#f3f3f3",
    position: "relative",
    marginTop: 0, // Remove margin for floating bar
  },
  mapLoader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: -40,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  stationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  stationAddress: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#222",
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  cardModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 18,
    paddingBottom: 36,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 6,
    minHeight: 260,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 18,
    right: 18,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
    elevation: 2,
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 4,
    width: "92%",
    maxWidth: 270,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    maxHeight: 180,
    zIndex: 30,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  suggestionText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  suggestionAddress: {
    fontSize: 13,
    color: "#6B7280",
  },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22C55E",
    borderRadius: 24,
    paddingVertical: 12,
    marginTop: 24,
    marginBottom: 0,
    alignSelf: "center",
    width: "100%",
    shadowColor: "#22C55E",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  directionsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

export default MapScreen;
