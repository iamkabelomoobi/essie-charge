import Navbar from "@/components/navbar/Navbar";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CustomCheckbox = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (v: boolean) => void;
}) => (
  <TouchableOpacity
    onPress={() => onValueChange(!value)}
    style={{
      width: 22,
      height: 22,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: value ? "#1B2CC1" : "#ccc",
      backgroundColor: value ? "#1B2CC1" : "#fff",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {value ? <Feather name="check" size={16} color="#fff" /> : null}
  </TouchableOpacity>
);

const AddPaymentMethodScreen: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [saveCard, setSaveCard] = useState(true);
  const [agree, setAgree] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Navbar title="Add New Card" />

      {/* Scan Card */}
      <TouchableOpacity style={styles.scanBox}>
        <Feather name="maximize-2" size={22} color="#2D3A8C" />
        <Text style={styles.scanText}>Scan your card</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>
      <Text style={styles.enterText}>Enter your card info</Text>

      {/* Name on Card */}
      <Text style={styles.inputLabel}>Name on Card</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Name on card"
          keyboardType="default"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Card Number */}
      <Text style={styles.inputLabel}>Card Number</Text>
      <View style={styles.inputRow}>
        <FontAwesome5
          name="cc-mastercard"
          size={22}
          color="#FF5F00"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Card number"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>

      {/* Expiry & CVV */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="mm/yyyy"
          keyboardType="number-pad"
          value={expiry}
          onChangeText={setExpiry}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="3 digit pin"
          keyboardType="number-pad"
          value={cvv}
          onChangeText={setCvv}
        />
      </View>

      {/* Checkboxes */}
      <View style={styles.checkboxRow}>
        <CustomCheckbox value={saveCard} onValueChange={setSaveCard} />
        <Text style={styles.checkboxLabel}>Save credit card information</Text>
      </View>
      <View style={styles.checkboxRow}>
        <CustomCheckbox value={agree} onValueChange={setAgree} />
        <Text style={styles.checkboxLabel}>
          I have read carefully and agree to the{" "}
          <Text style={styles.link}>terms and condition</Text>
        </Text>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f8fa", padding: 20 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    paddingTop: Platform.OS === "ios" ? 24 : 0,
  },
  backBtn: { padding: 4, marginRight: 10 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", flex: 1 },
  scanBox: {
    borderWidth: 1,
    borderColor: "#2D3A8C",
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 24,
    alignItems: "center",
    marginBottom: 18,
  },
  scanText: { color: "#2D3A8C", fontWeight: "bold", marginTop: 8 },
  orText: { textAlign: "center", color: "#A0A3BD", marginBottom: 8 },
  enterText: { fontWeight: "bold", fontSize: 16, marginBottom: 14 },
  inputLabel: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
    marginTop: 12,
    color: "#222",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    flex: 1,
    color: "#222",
  },
  checkboxRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  checkboxLabel: { marginLeft: 8, color: "#222", flex: 1, flexWrap: "wrap" },
  link: { color: "#2D3A8C", textDecorationLine: "underline" },
  saveBtn: {
    backgroundColor: "#1B2CC1",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  saveBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default AddPaymentMethodScreen;
