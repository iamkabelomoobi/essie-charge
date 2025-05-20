import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAlerts } from "../context/AlertsContext";

type DashboardRoutes =
  | "/(dashboard)/DashboardScreen"
  | "/(dashboard)/MapScreen"
  | "/(dashboard)/ScanScreen"
  | "/(dashboard)/AlertsScreen"
  | "/(dashboard)/SettingsScreen";

const navItems: {
  key: string;
  icon: React.ReactNode;
  route: DashboardRoutes;
  scan?: boolean;
}[] = [
  {
    key: "dashboard",
    icon: <Ionicons name="home-outline" size={25} color="#222" />,
    route: "/(dashboard)/DashboardScreen",
  },
  {
    key: "map",
    icon: <Ionicons name="map-outline" size={25} color="#222" />,
    route: "/(dashboard)/MapScreen",
  },
  {
    key: "scan",
    icon: <MaterialIcons name="center-focus-strong" size={32} color="#fff" />,
    route: "/(dashboard)/ScanScreen",
    scan: true,
  },
  {
    key: "alerts",
    icon: <Ionicons name="notifications-outline" size={25} color="#222" />,
    route: "/(dashboard)/AlertsScreen",
  },
  {
    key: "settings",
    icon: <Ionicons name="settings-outline" size={25} color="#222" />,
    route: "/(dashboard)/SettingsScreen",
  },
];

const BottomNav = () => {
  const router = useRouter();
  const { unreadCount } = useAlerts();

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={item.scan ? styles.scanButton : undefined}
          onPress={() => router.push(item.route)}
        >
          {item.key === "alerts" ? (
            <View>
              {item.icon}
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
          ) : (
            item.icon
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 32,
    paddingHorizontal: 24,
    paddingVertical: 5,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  scanButton: {
    backgroundColor: "#22c55e",
    borderRadius: 24,
    padding: 12,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center",
  },
});
