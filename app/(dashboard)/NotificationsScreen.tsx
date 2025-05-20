import Navbar from "@/components/navbar/Navbar";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const NotificationsScreen: React.FC = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Notifications" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications-outline" size={20} color="#000" />
              <Text style={styles.rowLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              thumbColor={pushEnabled ? "#000" : "#fff"}
              trackColor={{ false: "#ccc", true: "#000" }}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name="mail" size={20} color="#000" />
              <Text style={styles.rowLabel}>Email Notifications</Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              thumbColor={emailEnabled ? "#000" : "#fff"}
              trackColor={{ false: "#ccc", true: "#000" }}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name="message-square" size={20} color="#000" />
              <Text style={styles.rowLabel}>SMS Notifications</Text>
            </View>
            <Switch
              value={smsEnabled}
              onValueChange={setSmsEnabled}
              thumbColor={smsEnabled ? "#000" : "#fff"}
              trackColor={{ false: "#ccc", true: "#000" }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", top: 40 },
  scroll: { padding: 20, paddingBottom: 40 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 18,
    alignSelf: "center",
  },
  section: {
    backgroundColor: "#f6f7f9",
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowLabel: {
    marginLeft: 14,
    fontSize: 15,
    color: "#222",
  },
});

export default NotificationsScreen;
