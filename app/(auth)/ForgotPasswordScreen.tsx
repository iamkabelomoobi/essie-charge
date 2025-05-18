import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => router.push("/LoginScreen")}
        >
          <AntDesign name="arrowleft" size={28} color="#fff" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.centeredWrapper}>
        <View style={styles.form}>
          <Text style={styles.title}>Forgot Password</Text>
          {!sent ? (
            <>
              <Text style={styles.subtitle}>
                Enter your email to receive a reset link:
              </Text>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => setSent(true)}
              >
                <Text style={styles.loginButtonText}>Send Reset Link</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.successBox}>
              <AntDesign name="checkcircle" size={48} color="#27AE60" />
              <Text style={styles.successText}>
                Reset link sent! Check your email.
              </Text>
            </View>
          )}
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Remembered your password?</Text>
            <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
              <Text style={styles.bottomLink}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" }, // White background
  header: {
    height: 160,
    backgroundColor: "#fff", // White header
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 16,
    position: "relative",
  },
  backArrow: {
    position: "absolute",
    left: 16,
    top: 48,
    zIndex: 2,
  },
  logo: {
    width: 170,
    height: 100,
  },
  centeredWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 230,
    borderRadius: 32,
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    shadowColor: "#27AE60",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    width: width,
    alignSelf: "center",
    minHeight: 350,
    marginTop: 80,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: "#222",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  loginButton: {
    backgroundColor: "#27AE60",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  bottomText: {
    color: "#888",
    fontSize: 15,
  },
  bottomLink: {
    color: "#27AE60",
    fontSize: 15,
    fontWeight: "500",
  },
  successBox: {
    alignItems: "center",
    marginVertical: 32,
  },
  successText: {
    color: "#27AE60",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
});
