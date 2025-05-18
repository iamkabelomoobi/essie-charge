import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const user = {
  name: "James Braun",
  email: "jamesbraun@gmail.com",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
};

const SettingsRow = ({ icon, label, right, onPress }: any) => (
  <TouchableOpacity style={styles.row} onPress={onPress}>
    <View style={styles.rowLeft}>
      {icon}
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
    {right ? right : <Feather name="chevron-right" size={20} color="#bbb" />}
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Text style={styles.header}>Settings</Text>

        {/* User Info */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.profileText}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <SettingsRow
            icon={<FontAwesome name="user-o" size={20} color="#222" />}
            label="Profile"
            onPress={() => navigation.navigate("ProfileScreen")}
          />
          <SettingsRow
            icon={<Feather name="shield" size={20} color="#222" />}
            label="Security"
            onPress={() => navigation.navigate("SecurityScreen")}
          />
          <SettingsRow
            icon={<MaterialIcons name="lock-outline" size={20} color="#222" />}
            label="Privacy"
            onPress={() => navigation.navigate("PrivacyScreen")}
          />
          <SettingsRow
            icon={
              <Ionicons name="notifications-outline" size={20} color="#222" />
            }
            label="Notifications"
            onPress={() => navigation.navigate("NotificationsScreen")}
          />
        </View>

        {/* Personalization Section */}
        <Text style={styles.sectionTitle}>Personalization</Text>
        <View style={styles.sectionBox}>
          <SettingsRow
            icon={<Feather name="moon" size={20} color="#222" />}
            label="Dark Mode"
            right={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                thumbColor={darkMode ? "#222" : "#fff"}
                trackColor={{ false: "#ccc", true: "#222" }}
              />
            }
          />
          {/* <SettingsRow
            icon={
              <Ionicons name="color-palette-outline" size={20} color="#222" />
            }
            label="Appearance"
          /> */}
          <SettingsRow
            icon={<Feather name="globe" size={20} color="#222" />}
            label="Language"
          />
          {/* <SettingsRow
            icon={<MaterialIcons name="palette" size={20} color="#222" />}
            label="Theme"
          /> */}

          <SettingsRow
            icon={<Feather name="file-text" size={20} color="#222" />}
            label="Invoices"
            onPress={() => navigation.navigate("InvoicesScreen")}
          />
          <SettingsRow
            icon={<FontAwesome name="credit-card" size={20} color="#222" />}
            label="Payment Methods"
            onPress={() => navigation.navigate("PaymentMethodsScreen")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafbfc", paddingTop: 24 },
  scroll: { padding: 20, paddingBottom: 100 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 18 },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
    backgroundColor: "#eee",
  },
  profileText: {},
  name: { fontSize: 18, fontWeight: "bold" },
  email: { fontSize: 14, color: "#888" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f2f4",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 22,
    height: 40,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: "#222" },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 10,
    color: "#222",
  },
  sectionBox: {
    backgroundColor: "#f6f7f9",
    borderRadius: 14,
    marginBottom: 18,
    paddingVertical: 2,
    paddingHorizontal: 2,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    justifyContent: "space-between",
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  rowLabel: { marginLeft: 14, fontSize: 16, color: "#222" },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 68,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 10,
  },
  navBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  activeNavBtn: {
    backgroundColor: "#f1f2f4",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
});

export default SettingsScreen;
