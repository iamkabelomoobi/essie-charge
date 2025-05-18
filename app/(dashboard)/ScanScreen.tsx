import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const TIMER_DURATION = 10; // seconds

const generateUniqueData = () => `essie-charge:user:${Date.now()}`;

// Dummy previous transactions
// Generate 30 dummy previous transactions with location
const previousTransactions = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(),
  tx: `TXN-0x${(Math.random() * 1e16).toString(16).slice(0, 12).toUpperCase()}`,
  date: `2024-06-${(30 - i).toString().padStart(2, "0")}`,
  amount: `R${(Math.floor(Math.random() * 200) + 50)}`,
  location: ["Sandton", "Rosebank", "Midrand", "Centurion", "Randburg"][i % 5],
}));

const ScanScreen: React.FC = () => {
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [showQR, setShowQR] = useState(false);
  const [uniqueData, setUniqueData] = useState(generateUniqueData());
  const [historyVisible, setHistoryVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setShowQR(false);
    setTimer(TIMER_DURATION);
    if (timerRef.current) clearInterval(timerRef.current);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (showQR) {
      setTimer(TIMER_DURATION);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setShowQR(false);
            return TIMER_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showQR]);

  const handleAction = () => {
    setUniqueData(generateUniqueData());
    setShowQR(true);
    setTimer(TIMER_DURATION);
  };

  // Blur if QR is not visible (first load or after expiry)
  const shouldBlur = !showQR;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Row */}
      <View style={[styles.headerRow, { marginBottom: 160, marginTop: 25 }]}>
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => setHistoryVisible(true)}
        >
          <Ionicons name="time-outline" size={22} color="#232326" />
          <Text style={styles.historyButtonText}>History</Text>
          <Ionicons name="chevron-down" size={18} color="#232326" />
        </TouchableOpacity>
      </View>

      {/* History Modal */}
      <Modal
        visible={historyVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setHistoryVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.historyModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Previous Transactions</Text>
              <TouchableOpacity onPress={() => setHistoryVisible(false)}>
                <Ionicons name="close" size={24} color="#232326" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={previousTransactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.historyItem}>
                  <Text style={styles.historyTx}>{item.tx}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                  <Text style={styles.historyAmount}>{item.amount}</Text>
                  <Text style={styles.historyLocation}>{item.location}</Text>
                </View>
              )}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#eee",
                    marginVertical: 4,
                  }}
                />
              )}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.card}>
        <Text style={styles.title}>Scan QR code</Text>
        <Text style={styles.subtitle}>
          Scan this QR code in-app to verify your transaction
        </Text>
        <View style={styles.qrContainer}>
          <QRCode value={uniqueData} size={148} />
          {shouldBlur && (
            <BlurView
              intensity={60}
              tint="light"
              style={StyleSheet.absoluteFill}
            >
              <View style={styles.blurOverlay}>
                <Text style={styles.blurText}>QR Code Hidden</Text>
              </View>
            </BlurView>
          )}
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{uniqueData.split(":")[2]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Transaction:</Text>
          <Text style={styles.value}>TXN-0xABCDEF123456</Text>
        </View>
      </View>
      <Text style={styles.timerText}>
        QR visible for: {showQR ? `${timer}s` : "--"}
      </Text>
      <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
        <Text style={styles.actionButtonText}>
          {showQR ? "Generate new QRCode" : "Show QRCode"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 24,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  headerTitle: {
    color: "#232326",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  historyButtonText: {
    color: "#232326",
    fontWeight: "bold",
    marginLeft: 4,
    marginRight: 2,
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "flex-end",
  },
  historyModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    minHeight: 320,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#232326",
  },
  historyItem: {
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  historyTx: {
    color: "#232326",
    fontWeight: "bold",
    fontSize: 15,
  },
  historyDate: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },
  historyAmount: {
    color: "#22C55E",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 2,
  },
  historyLocation: {
    color: "#555",
    fontSize: 13,
    marginTop: 2,
  },
  card: {
    backgroundColor: "#232326",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    width: 340,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 24,
    textAlign: "center",
  },
  qrContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  blurOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurText: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  label: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  timerText: {
    color: "#aaa",
    marginTop: 16,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  actionButton: {
    marginTop: 20,
    backgroundColor: "#22C55E",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 24,
    alignSelf: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default ScanScreen;
