import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const PrivacyScreen: React.FC = () => {
  const [showProfile, setShowProfile] = useState(true);
  const [shareData, setShareData] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Privacy</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name="user" size={20} color="#7a5a36" />
              <Text style={styles.rowLabel}>Show My Profile Publicly</Text>
            </View>
            <Switch
              value={showProfile}
              onValueChange={setShowProfile}
              thumbColor={showProfile ? "#7a5a36" : "#fff"}
              trackColor={{ false: "#ccc", true: "#7a5a36" }}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name="share-2" size={20} color="#7a5a36" />
              <Text style={styles.rowLabel}>Allow Data Sharing</Text>
            </View>
            <Switch
              value={shareData}
              onValueChange={setShareData}
              thumbColor={shareData ? "#7a5a36" : "#fff"}
              trackColor={{ false: "#ccc", true: "#7a5a36" }}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name="target" size={20} color="#7a5a36" />
              <Text style={styles.rowLabel}>Personalized Ads</Text>
            </View>
            <Switch
              value={personalizedAds}
              onValueChange={setPersonalizedAds}
              thumbColor={personalizedAds ? "#7a5a36" : "#fff"}
              trackColor={{ false: "#ccc", true: "#7a5a36" }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manage Data</Text>
          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="download" size={18} color="#7a5a36" />
            <Text style={styles.actionText}>Download My Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Feather name="trash-2" size={18} color="#d9534f" />
            <Text style={[styles.actionText, { color: "#d9534f" }]}>
              Delete My Account
            </Text>
          </TouchableOpacity>
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
    color: "#7a5a36",
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
    color: "#7a5a36",
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
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#7a5a36",
    fontWeight: "500",
  },
});

export default PrivacyScreen;