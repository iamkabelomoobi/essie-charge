import Navbar from "@/components/navbar/Navbar";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SecurityScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [biometrics, setBiometrics] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Security" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Change Password */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            placeholderTextColor="#b8b8b8"
          />
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholderTextColor="#b8b8b8"
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#b8b8b8"
          />
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Update Password</Text>
          </TouchableOpacity>
        </View>

        {/* Security Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Options</Text>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <MaterialIcons name="fingerprint" size={22} color="#000" />
              <Text style={styles.rowLabel}>Enable Biometrics</Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              thumbColor={biometrics ? "#000" : "#fff"}
              trackColor={{ false: "#ccc", true: "#000" }}
            />
          </View>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name="shield" size={20} color="#000" />
              <Text style={styles.rowLabel}>Two-Factor Authentication</Text>
            </View>
            <Switch
              value={twoFA}
              onValueChange={setTwoFA}
              thumbColor={twoFA ? "#000" : "#fff"}
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
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 6,
    marginTop: 10,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#222",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#000",
  },
  saveBtn: {
    backgroundColor: "#22c55e",
    borderRadius: 10,
    marginTop: 18,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
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

export default SecurityScreen;
