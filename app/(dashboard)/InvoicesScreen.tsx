import Navbar from "@/components/navbar/Navbar";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Sample invoice data
const invoices = [
  {
    id: "INV-2023-001",
    date: "May 15, 2025",
    amount: 89.99,
    status: "Paid",
  },
  {
    id: "INV-2023-002",
    date: "April 15, 2025",
    amount: 89.99,
    status: "Paid",
  },
  {
    id: "INV-2023-003",
    date: "March 15, 2025",
    amount: 89.99,
    status: "Paid",
  },
  {
    id: "INV-2023-004",
    date: "February 15, 2025",
    amount: 89.99,
    status: "Pending",
  },
  {
    id: "INV-2023-005",
    date: "January 15, 2025",
    amount: 89.99,
    status: "Paid",
  },
];

const InvoicesScreen: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState<"All" | "Paid" | "Pending">("All");
  const navigation = useNavigation<any>();

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesFilter = filter === "All" || invoice.status === filter;
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchText.toLowerCase()) ||
      invoice.date.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderInvoiceItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.invoiceCard}
      onPress={() =>
        navigation.navigate("InvoiceDetailScreen", { invoice: item })
      }
    >
      <View style={styles.cardLeft}>
        <Text style={styles.invoiceId}>{item.id}</Text>
        <Text style={styles.invoiceDate}>{item.date}</Text>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.invoiceAmount}>R{item.amount.toFixed(2)}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "Paid" ? styles.paidBadge : styles.pendingBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === "Paid" ? styles.paidText : styles.pendingText,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Invoices" />

      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search invoices"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === "All" && styles.activeFilterBtn]}
          onPress={() => setFilter("All")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "All" && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === "Paid" && styles.activeFilterBtn,
          ]}
          onPress={() => setFilter("Paid")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "Paid" && styles.activeFilterText,
            ]}
          >
            Paid
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filter === "Pending" && styles.activeFilterBtn,
          ]}
          onPress={() => setFilter("Pending")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "Pending" && styles.activeFilterText,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredInvoices}
        renderItem={renderInvoiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafbfc",
    top: 40,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f2f4",
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#222",
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: 20,
  },
  activeFilterBtn: {
    backgroundColor: "#000",
  },
  filterText: {
    fontSize: 14,
    color: "#000",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "500",
  },
  listContainer: {
    padding: 20,
    paddingTop: 5,
  },
  invoiceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardLeft: {},
  invoiceId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 4,
  },
  invoiceDate: {
    fontSize: 14,
    color: "#888",
  },
  cardRight: {
    alignItems: "flex-end",
  },
  invoiceAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  paidBadge: {
    backgroundColor: "#e8f5e9",
  },
  pendingBadge: {
    backgroundColor: "#fff8e1",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  paidText: {
    color: "#2e7d32",
  },
  pendingText: {
    color: "#ff8f00",
  },
});

export default InvoicesScreen;
