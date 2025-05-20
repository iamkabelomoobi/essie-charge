import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useAlerts } from "../../context/AlertsContext";
import Navbar from "@/components/navbar/Navbar";

const alertsData = [
  {
    id: "1",
    title: "Payment Successful",
    message: "Your payment of R120 was successful.",
    time: "2 min ago",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "Low Balance",
    message: "Your wallet balance is below R50.",
    time: "10 min ago",
    type: "warning",
    read: false,
  },
  {
    id: "3",
    title: "New Promotion",
    message: "Get 10% off your next charge at Sandton.",
    time: "1 hour ago",
    type: "info",
    read: false,
  },
  {
    id: "4",
    title: "Charger Available",
    message: "A charger is now available at Rosebank.",
    time: "2 hours ago",
    type: "info",
    read: false,
  },
  {
    id: "5",
    title: "Session Ended",
    message: "Your charging session at Midrand has ended.",
    time: "3 hours ago",
    type: "success",
    read: false,
  },
  {
    id: "6",
    title: "Payment Failed",
    message: "Your payment at Centurion failed. Please try again.",
    time: "4 hours ago",
    type: "warning",
    read: false,
  },
  {
    id: "7",
    title: "Account Updated",
    message: "Your account details were updated.",
    time: "5 hours ago",
    type: "info",
    read: false,
  },
  {
    id: "8",
    title: "Promo Ending Soon",
    message: "Your 10% promo at Sandton ends today.",
    time: "6 hours ago",
    type: "info",
    read: false,
  },
  {
    id: "9",
    title: "New Station",
    message: "A new charging station opened in Randburg.",
    time: "8 hours ago",
    type: "info",
    read: false,
  },
  {
    id: "10",
    title: "Top Up Successful",
    message: "You topped up R200 to your wallet.",
    time: "9 hours ago",
    type: "success",
    read: false,
  },
  {
    id: "11",
    title: "Maintenance Notice",
    message: "Scheduled maintenance at Midrand tomorrow.",
    time: "10 hours ago",
    type: "warning",
    read: false,
  },
  {
    id: "12",
    title: "Welcome!",
    message: "Thank you for joining Essie Charge.",
    time: "1 day ago",
    type: "success",
    read: false,
  },
  {
    id: "13",
    title: "Refer & Earn",
    message: "Refer a friend and earn rewards.",
    time: "2 days ago",
    type: "info",
    read: false,
  },
];

const iconMap = {
  success: { name: "checkmark-circle", color: "#22C55E" },
  warning: { name: "alert-circle", color: "#F59E42" },
  info: { name: "information-circle", color: "#3B82F6" },
};

type AlertType = keyof typeof iconMap;

const AlertsScreen: React.FC = () => {
  const [alerts, setAlerts] = useState(alertsData);
  const { setUnreadCount } = useAlerts();

  React.useEffect(() => {
    setUnreadCount(alerts.filter((a) => !a.read).length);
  }, [alerts, setUnreadCount]);

  const unreadCount = alerts.filter((a) => !a.read).length;

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Alerts" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity onPress={markAllRead} style={styles.readAllBtn}>
          <Text style={styles.readAllText}>Mark all as read</Text>
        </TouchableOpacity>
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          renderItem={({ item }) => {
            const icon = iconMap[item.type as AlertType] || iconMap.info;
            return (
              <View
                style={[styles.alertCard, item.read && styles.alertCardRead]}
              >
                <Ionicons
                  name={icon.name as any}
                  size={28}
                  color={icon.color}
                  style={{ marginRight: 12, opacity: item.read ? 0.4 : 1 }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={[styles.alertTitle, item.read && styles.readText]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.alertMessage, item.read && styles.readText]}
                  >
                    {item.message}
                  </Text>
                  <Text
                    style={[styles.alertTime, item.read && styles.readText]}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No alerts at this time.</Text>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafbfc", paddingTop: 24 },
  scroll: { padding: 20, paddingBottom: 100 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    top: 20,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#232326",
    textAlign: "left",
    flex: 1,
  },
  badge: {
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    marginRight: 8,
    paddingHorizontal: 6,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  readAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  readAllText: {
    color: "#22C55E",
    fontWeight: "bold",
    marginLeft: 4,
    fontSize: 15,
  },
  alertCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  alertCardRead: {
    opacity: 0.5,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#232326",
    marginBottom: 2,
  },
  alertMessage: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: "#888",
  },
  readText: {
    color: "#888",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 40,
    fontSize: 16,
  },
});

export default AlertsScreen;
