import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>This is a demo settings screen.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});

export default SettingsScreen;
