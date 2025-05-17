import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const SplashScreen = () => {
  const handleGetStarted = () => {
    // Add navigation or logic here
  };

  return (
    <LinearGradient colors={["#fff", "#fff"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.centerContent, { marginTop: -120 }]}>
          <Image
            source={require("../assets/images/splash-icon.png")}
            style={styles.logo}
          />
          <Text style={styles.appName}>NEVER LOSE POWER!</Text>
        </View>
        <View style={styles.bottomCurveContainer}>
          <View style={styles.bottomCurve} />
          <TouchableOpacity
            style={styles.button}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 32,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  bottomCurveContainer: {
    width: "100%",
    alignItems: "center",
    position: "relative",
    marginBottom: 0,
  },
  bottomCurve: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: 90,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    backgroundColor: "#27AE60", // changed from #2D7DF6 to green
    zIndex: 1,
  },
  button: {
    position: "absolute",
    bottom: 30,
    left: width * 0.25,
    width: width * 0.5,
    height: 48,
    backgroundColor: "#fff", // changed from #2D7DF6 to white
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    elevation: 2,
  },
  buttonText: {
    color: "#000", // changed from #fff to black
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default SplashScreen;
