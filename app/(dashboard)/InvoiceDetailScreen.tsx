import Navbar from "@/components/navbar/Navbar";
import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending";
  // Add other fields as needed
};

// Define the param list for all routes
type RootStackParamList = {
  InvoiceDetail: { invoice: Invoice };
  // Add other routes as needed
};

const InvoiceDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "InvoiceDetail">>();
  const invoice = route.params.invoice;

  if (!invoice) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Invoice not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Invoice Details" />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Invoice Card */}
        <View style={styles.invoiceContainer}>
          <View style={styles.invoiceHeader}>
            <View style={styles.companySection}>
              <Text style={styles.companyName}>Essie Charge</Text>
              <Text style={styles.companyInfo}>123 Electric Avenue</Text>
              <Text style={styles.companyInfo}>San Francisco, CA 94103</Text>
              <Text style={styles.companyInfo}>support@essiecharge.com</Text>
            </View>

            <View style={styles.statusSection}>
              <View
                style={[
                  styles.statusBadge,
                  invoice.status === "Paid"
                    ? styles.paidBadge
                    : styles.pendingBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    invoice.status === "Paid"
                      ? styles.paidText
                      : styles.pendingText,
                  ]}
                >
                  {invoice.status}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Invoice Number:</Text>
            <Text style={styles.infoValue}>{invoice.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Issued Date:</Text>
            <Text style={styles.infoValue}>{invoice.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Due Date:</Text>
            <Text style={styles.infoValue}>{invoice.date}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.serviceItem}>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceName}>Monthly Subscription</Text>
              <Text style={styles.serviceDescription}>
                Premium charging service - monthly plan
              </Text>
            </View>
            <Text style={styles.servicePrice}>
              R{invoice.amount.toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>
                R{invoice.amount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax (8%)</Text>
              <Text style={styles.totalValue}>
                R{(invoice.amount * 0.08).toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalRowFinal}>
              <Text style={styles.totalLabelFinal}>Total</Text>
              <Text style={styles.totalValueFinal}>
                R{(invoice.amount * 1.08).toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.paymentInfo}>
            {invoice.status === "Paid"
              ? `Payment received on R{invoice.date}`
              : "Payment pending"}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="download" size={20} color="#fff" />
            <Text style={styles.actionText}>Download PDF</Text>
          </TouchableOpacity>

          {invoice.status === "Pending" && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#2e7d32" }]}
            >
              <Feather name="credit-card" size={20} color="#fff" />
              <Text style={styles.actionText}>Pay Now</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
    top: 40,
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    color: "#d32f2f",
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
  invoiceContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  invoiceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  companySection: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  companyInfo: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  statusSection: {
    alignItems: "flex-end",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  serviceDetails: {
    flex: 1,
    marginRight: 10,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginBottom: 3,
  },
  serviceDescription: {
    fontSize: 13,
    color: "#666",
  },
  servicePrice: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  totalSection: {
    marginVertical: 5,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRowFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 14,
    color: "#666",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
  totalLabelFinal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  totalValueFinal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22cc5e",
  },
  paymentInfo: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22cc5e",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 10,
  },
  paidBadge: {
    backgroundColor: "#e8f5e9",
  },
  pendingBadge: {
    backgroundColor: "#fff8e1",
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  paidText: {
    color: "#2e7d32",
  },
  pendingText: {
    color: "#ff8f00",
  },
});

export default InvoiceDetailScreen;
