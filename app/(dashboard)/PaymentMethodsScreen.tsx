import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Sample payment methods
const paymentMethods = [
  {
    id: "1",
    type: "visa",
    cardNumber: "•••• •••• •••• 4242",
    expiryDate: "09/26",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    cardNumber: "•••• •••• •••• 5555",
    expiryDate: "11/25",
    isDefault: false,
  },
];

// Define payment method type
type PaymentMethod = {
  id: string;
  type: string;
  cardNumber: string;
  expiryDate: string;
  isDefault: boolean;
};

const PaymentMethodsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [methods, setMethods] = useState<PaymentMethod[]>(paymentMethods);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCardData, setNewCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    type: "visa", // Default type
  });
  const [error, setError] = useState("");

  // Use useCallback to prevent function recreation on each render
  const setDefaultPaymentMethod = useCallback(
    (id: string) => {
      setMethods(
        methods.map((method) => ({
          ...method,
          isDefault: method.id === id,
        }))
      );
    },
    [methods]
  );

  const removePaymentMethod = useCallback(
    (id: string) => {
      setMethods(methods.filter((method) => method.id !== id));
    },
    [methods]
  );

  const getCardIcon = useCallback((type: string) => {
    switch (type.toLowerCase()) {
      case "visa":
        return <FontAwesome5 name="cc-visa" size={28} color="#1A1F71" />;
      case "mastercard":
        return <FontAwesome5 name="cc-mastercard" size={28} color="#EB001B" />;
      case "amex":
        return <FontAwesome5 name="cc-amex" size={28} color="#2E77BC" />;
      case "discover":
        return <FontAwesome5 name="cc-discover" size={28} color="#FF6600" />;
      case "paypal":
        return <FontAwesome5 name="cc-paypal" size={28} color="#003087" />;
      default:
        return <FontAwesome5 name="credit-card" size={28} color="#222" />;
    }
  }, []);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleModalOpen = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const detectCardType = (number: string) => {
    const visaPattern = /^4/;
    const mastercardPattern = /^5[1-5]/;
    const amexPattern = /^3[47]/;
    const discoverPattern = /^6(?:011|5)/;

    if (visaPattern.test(number)) return "visa";
    if (mastercardPattern.test(number)) return "mastercard";
    if (amexPattern.test(number)) return "amex";
    if (discoverPattern.test(number)) return "discover";
    return "unknown";
  };

  // Pure formatting function (does NOT update state)
  const formatCardNumber = (text: string) => {
    const cleanText = text.replace(/\D/g, "");
    let formatted = "";
    for (let i = 0; i < cleanText.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += " ";
      }
      formatted += cleanText[i];
    }
    return formatted;
  };

  const formatExpiryDate = (text: string) => {
    const cleanText = text.replace(/\D/g, "");
    let formatted = cleanText;
    if (cleanText.length > 2) {
      formatted = cleanText.slice(0, 2) + "/" + cleanText.slice(2, 4);
    }
    return formatted;
  };

  const validateAndAddCard = () => {
    if (newCardData.cardNumber.length < 15) {
      setError("Please enter a valid card number");
      return;
    }
    if (
      !newCardData.expiryDate.includes("/") ||
      newCardData.expiryDate.length !== 5
    ) {
      setError("Please enter a valid expiry date (MM/YY)");
      return;
    }
    if (newCardData.cvv.length < 3) {
      setError("Please enter a valid CVV code");
      return;
    }
    if (!newCardData.cardholderName.trim()) {
      setError("Please enter the cardholder name");
      return;
    }
    const lastFour = newCardData.cardNumber.slice(-4);
    const maskedNumber = "•••• •••• •••• " + lastFour;
    const newCard = {
      id: Date.now().toString(),
      type: newCardData.type,
      cardNumber: maskedNumber,
      expiryDate: newCardData.expiryDate,
      isDefault: methods.length === 0,
    };
    setMethods([...methods, newCard]);
    setModalVisible(false);
    setError("");
    setNewCardData({
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      type: "visa",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Feather name="arrow-left" size={22} color="#222" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Methods</Text>
          <View style={{ width: 22 }} />
        </View>

        {methods.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="credit-card" size={40} color="#ccc" />
            <Text style={styles.emptyText}>No payment methods added yet</Text>
          </View>
        ) : (
          methods.map((method) => (
            <View key={method.id} style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <View style={styles.cardType}>
                  {getCardIcon(method.type)}
                  <Text style={styles.cardTypeText}>
                    {method.type.toUpperCase()}
                  </Text>
                </View>
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardNumber}>{method.cardNumber}</Text>
                <Text style={styles.cardExpiry}>
                  Expires {method.expiryDate}
                </Text>
              </View>

              <View style={styles.cardActions}>
                {!method.isDefault && (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setDefaultPaymentMethod(method.id)}
                  >
                    <Text style={styles.actionText}>Set as Default</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[styles.actionButton, styles.removeButton]}
                  onPress={() => removePaymentMethod(method.id)}
                >
                  <Feather name="trash-2" size={16} color="#d32f2f" />
                  <Text style={[styles.actionText, styles.removeText]}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleModalOpen}>
          <Feather name="plus" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Payment Method</Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Feather name="shield" size={16} color="#666" />
          <Text style={styles.securityText}>
            Your payment information is stored securely and encrypted.
          </Text>
        </View>
      </ScrollView>

      {/* Add Payment Method Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Payment Method</Text>
              <TouchableOpacity onPress={handleModalClose}>
                <Feather name="x" size={24} color="#222" />
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.cardTypeIndicator}>
              {getCardIcon(newCardData.type)}
            </View>

            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={19}
              value={formatCardNumber(newCardData.cardNumber)}
              onChangeText={(text) => {
                const cleanText = text.replace(/\D/g, "");
                const type = detectCardType(cleanText);
                setNewCardData({
                  ...newCardData,
                  cardNumber: cleanText,
                  type,
                });
              }}
            />

            <Text style={styles.inputLabel}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#999"
              value={newCardData.cardholderName}
              onChangeText={(text) =>
                setNewCardData({ ...newCardData, cardholderName: text })
              }
            />

            <View style={styles.rowInputs}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  maxLength={5}
                  value={formatExpiryDate(newCardData.expiryDate)}
                  onChangeText={(text) => {
                    const formatted = formatExpiryDate(text);
                    setNewCardData({ ...newCardData, expiryDate: formatted });
                  }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  maxLength={4}
                  secureTextEntry
                  value={newCardData.cvv}
                  onChangeText={(text) =>
                    setNewCardData({ ...newCardData, cvv: text })
                  }
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.addButton, { marginTop: 30 }]}
              onPress={validateAndAddCard}
            >
              <Text style={styles.addButtonText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  // Existing styles...
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    top: 40,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardType: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTypeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginLeft: 10,
  },
  defaultBadge: {
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  defaultText: {
    fontSize: 12,
    color: "#2e7d32",
    fontWeight: "600",
  },
  cardContent: {
    marginBottom: 14,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "500",
    color: "#222",
    marginBottom: 6,
  },
  cardExpiry: {
    fontSize: 14,
    color: "#666",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 14,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    color: "#7a5a36",
    fontWeight: "500",
    marginLeft: 4,
  },
  removeButton: {
    marginLeft: 8,
  },
  removeText: {
    color: "#d32f2f",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7a5a36",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  securityText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 6,
    textAlign: "center",
  },

  // New modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 25,
    paddingBottom: Platform.OS === "ios" ? 40 : 25,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  cardTypeIndicator: {
    alignItems: "center",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f6f7f9",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#222",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    marginTop: 16,
  },
});

export default PaymentMethodsScreen;
