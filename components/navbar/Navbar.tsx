import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type NavbarProps = {
  title: string;
  onBack?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ title, onBack }) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack ? onBack : () => navigation.goBack()}
      >
        <Feather name="arrow-left" size={24} color="#222" />
      </TouchableOpacity>
      <Text style={styles.header}>{title}</Text>
      <View style={{ width: 32 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    paddingTop: 24,},
  backBtn: {
    padding: 4,
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});

export default Navbar;
