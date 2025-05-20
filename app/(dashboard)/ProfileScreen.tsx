import Navbar from "@/components/navbar/Navbar";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Profile" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Feather name="user" size={48} color="#d2bfa6" />
            <TouchableOpacity style={styles.avatarEdit}>
              <Feather name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>
            Full Name<Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#b8b8b8"
          />

          <Text style={styles.label}>
            Mobile Number<Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputRow}>
            <Text style={styles.countryCode}>+1</Text>
            <TextInput
              style={[styles.input, { flex: 1, marginLeft: 8, borderWidth: 0 }]}
              placeholder="Mobile number"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              placeholderTextColor="#b8b8b8"
            />
          </View>

          <Text style={styles.label}>
            Email Address<Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#b8b8b8"
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor="#b8b8b8"
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="City"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#b8b8b8"
            />
            <TextInput
              style={[styles.input, styles.inputHalf, { marginLeft: 8 }]}
              placeholder="State"
              value={state}
              onChangeText={setState}
              placeholderTextColor="#b8b8b8"
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="Zip Code"
              value={zip}
              onChangeText={setZip}
              keyboardType="numeric"
              placeholderTextColor="#b8b8b8"
            />
            <TextInput
              style={[styles.input, styles.inputHalf, { marginLeft: 8 }]}
              placeholder="Country"
              value={country}
              onChangeText={setCountry}
              placeholderTextColor="#b8b8b8"
            />
          </View>

          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafbfc", paddingTop: 24 },
  scroll: { padding: 20, paddingBottom: 100 },
  headerBox: {
    backgroundColor: "#22c55e",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 24,
    paddingBottom: 36,
    alignItems: "center",
    position: "relative",
  },
  menuIcon: {
    position: "absolute",
    left: 24,
    top: 32,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 18,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    position: "relative",
  },
  avatarEdit: {
    position: "absolute",
    right: 6,
    bottom: 6,
    backgroundColor: "#000",
    borderRadius: 14,
    padding: 4,
    borderWidth: 2,
    borderColor: "#fff",
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginBottom: 6,
    marginTop: 12,
  },
  required: {
    color: "#d9534f",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f6f7f9",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#222",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#f6f7f9",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f7f9",
    borderRadius: 10,
    marginBottom: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#f6f7f9",
  },
  countryCode: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 4,
  },
  inputHalf: {
    flex: 1,
  },
  saveBtn: {
    backgroundColor: "#22c55e",
    borderRadius: 10,
    marginTop: 24,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

export default ProfileScreen;
