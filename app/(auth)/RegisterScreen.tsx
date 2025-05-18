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

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/splash-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formWrapper}>
        <View style={styles.form}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>
            Create your account. It&#39;s free!
          </Text>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={setLastName}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>
            Password <Text style={styles.passwordHint}>(8+ characters)</Text>
          </Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeIcon}
            >
              <AntDesign
                name={showPassword ? "eye" : "eyeo"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              // Add your registration logic here
              console.log("Sign Up button pressed");
            }}
          >
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign
                name="google"
                size={22}
                color="#EA4335"
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign
                name="apple1"
                size={22}
                color="#000"
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => router.replace("/LoginScreen")}
            >
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
    height: 120,
    backgroundColor: "#fff", // White header
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 16,
  },
  logo: {
    width: 140,
    height: 90,
  },
  formWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    // Green box shadow
    shadowColor: "#27AE60",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
    width: width,
    alignSelf: "center",
    minHeight: 500,
    marginTop: 25,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
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
  passwordHint: {
    fontSize: 13,
    color: "#888",
    fontWeight: "400",
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
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  eyeIcon: {
    marginLeft: -36,
    padding: 8,
    zIndex: 1,
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
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  orText: {
    color: "#888",
    fontSize: 15,
    marginHorizontal: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  socialIcon: {
    marginRight: 8,
  },
  socialText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
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
});
