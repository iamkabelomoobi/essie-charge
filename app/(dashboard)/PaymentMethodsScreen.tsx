import Navbar from "@/components/navbar/Navbar";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

// PayPal SVG Icon (from provided SVG)
const PayPalIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 48 48">
    <Path
      fill="#1565C0"
      d="M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c0.017,0,0.034-0.007,0.051-0.006C32.896,8.215,28.887,6,25.35,6H11.878c-0.474,0-0.852,0.335-0.955,0.777l-0.005-0.002L5.029,33.813l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,0.991,1,0.991h8.071L18.7,13.767z"
    />
    <Path
      fill="#039BE5"
      d="M33.183,12.994c0.053,0.876-0.005,1.829-0.229,2.882c-1.281,5.995-5.912,9.115-11.635,9.115c0,0-3.47,0-4.313,0c-0.521,0-0.767,0.306-0.88,0.54l-1.74,8.049l-0.305,1.429h-0.006l-1.263,5.796l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,1,1,1h7.333l0.013-0.01c0.472-0.007,0.847-0.344,0.945-0.788l0.018-0.015l1.812-8.416c0,0,0.126-0.803,0.97-0.803s4.178,0,4.178,0c5.723,0,10.401-3.106,11.683-9.102C42.18,16.106,37.358,13.019,33.183,12.994z"
    />
    <Path
      fill="#283593"
      d="M19.66,13c-0.474,0-0.852,0.326-0.955,0.769L18.7,13.767l-2.575,11.765c0.113-0.234,0.359-0.54,0.88-0.54c0.844,0,4.235,0,4.235,0c5.723,0,10.432-3.12,11.713-9.115c0.225-1.053,0.282-2.006,0.229-2.882C33.166,12.993,33.148,13,33.132,13H19.66z"
    />
  </Svg>
);

// Google Pay SVG Icon (updated)
const GooglePayIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 24 24">
    <Path d="M8.994 12.242H4.863v1.502h2.002c-.165.345-.402.646-.691.89l.001.001-.002 0c-.457.382-1.044.611-1.686.611-1.114 0-2.065-.692-2.448-1.67-.117-.298-.181-.621-.181-.959 0-.545.166-1.05.449-1.47l.049-.065c.476-.664 1.251-1.094 2.13-1.094.702 0 1.341.274 1.81.725l1.254-1.401C6.748 8.569 5.67 8.111 4.487 8.111c-1.555 0-2.926.789-3.737 1.987-.486.72-.77 1.587-.77 2.52 0 .74.178 1.438.494 2.054.747 1.456 2.263 2.453 4.012 2.453 1.201 0 2.292-.469 3.1-1.235l-.001-.001c.867-.818 1.408-1.983 1.408-3.27V12.242zM21.045 15.353l-1.773-4.658h1.077l1.211 3.545 1.485-3.545h.935c0 0-2.9 6.842-2.924 6.899l-.935.024C20.138 17.579 21.045 15.353 21.045 15.353zM18.012 13.552c0 .577-.508.988-1.18.988-.528 0-.865-.245-.865-.62 0-.387.324-.612.943-.648l1.105-.081L18.012 13.552zM17.095 10.695c-1.053 0-1.832.581-1.861 1.379h.894c.074-.38.438-.628.938-.628.606 0 .949.272.949.775l0 .347-1.24.064c-1.151.067-1.775.522-1.775 1.312 0 .798.643 1.328 1.565 1.328.623 0 1.201-.304 1.463-.786h.02l.003.786h.915v-3.114C18.967 11.268 18.229 10.695 17.095 10.695zM12.56 12.22h-1.221V9.78h1.221c.871 0 1.43.411 1.43 1.221S13.435 12.22 12.56 12.22zM12.852 8.865h-2.428v6.407h.915v-2.136h1.479C14.088 13.136 15 12.25 15 11S14.105 8.865 12.852 8.865z" fill="#000"/>
  </Svg>
);

// Apple Pay SVG Icon (from provided SVG)
const ApplePayIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 50 50">
    <Path d="M 9.984375 15.001953 C 9.149375 15.041953 8.1182969 15.573313 7.5292969 16.320312 C 6.9892969 16.964312 6.5275313 18.010188 6.6445312 18.992188 C 7.5875313 19.074188 8.5301406 18.500438 9.1191406 17.773438 C 9.6991406 17.026437 10.082375 16.024953 9.984375 15.001953 z M 18 17 L 18 32 L 20.375 32 L 20.375 27 L 23.625 27 C 26.608 27 28.75 24.925 28.75 22 C 28.75 19.075 26.647125 17 23.703125 17 L 18 17 z M 20.375 19 L 23.125 19 C 25.172 19 26.375 20.105 26.375 22 C 26.375 23.895 25.182 25 23.125 25 L 20.375 25 L 20.375 19 z M 9.875 19.5 C 8.5 19.5 7.517 20.25 6.875 20.25 C 6.223 20.25 5.25 19.509766 4.125 19.509766 C 2.75 19.509766 1.4033594 20.372859 0.69335938 21.630859 C -0.76564063 24.145859 0.31460937 27.869016 1.7246094 29.916016 C 2.4156094 30.930016 3.25 32 4.375 32 C 5.406 31.961 5.755 31.375 7 31.375 C 8.254 31.375 8.625 32 9.75 32 C 10.875 32 11.556094 30.969078 12.246094 29.955078 C 13.034094 28.805078 13.356 27.684 13.375 27.625 C 13.356 27.606 11.197734 26.77725 11.177734 24.28125 C 11.158734 22.19525 12.879031 21.200578 12.957031 21.142578 C 11.984031 19.700578 10.375 19.5 10 19.5 L 9.875 19.5 z M 34.199219 21 C 31.710219 21 29.870734 22.395453 29.802734 24.314453 L 31.912109 24.314453 C 32.086109 23.402453 32.948859 22.804688 34.130859 22.804688 C 35.563859 22.804688 36.373047 23.460969 36.373047 24.667969 L 36.375 25.5 L 33.443359 25.654297 C 30.722359 25.815297 29.25 26.908594 29.25 28.808594 C 29.25 30.727594 30.770219 32.001953 32.949219 32.001953 C 34.421219 32.001953 35.78725 31.270328 36.40625 30.111328 L 36.455078 30.111328 L 36.455078 31.886719 L 38.623047 31.886719 L 38.623047 24.515625 C 38.624047 22.376625 36.882219 21 34.199219 21 z M 39.5 21 L 43.507812 31.949219 L 43.292969 32.615234 C 42.930969 33.744234 42.344828 34.177734 41.298828 34.177734 C 41.119828 34.177734 40.781 34.159625 40.625 34.140625 L 40.625 35.945312 C 40.783 35.980313 41.332906 36 41.503906 36 C 43.810906 36 44.896703 35.132047 45.845703 32.498047 L 50 21 L 47.595703 21 L 44.808594 29.884766 L 44.759766 29.884766 L 41.972656 21 L 39.5 21 z M 36.375 27 L 36.367188 27.867188 C 36.367188 29.254188 35.166125 30.242188 33.578125 30.242188 C 32.329125 30.242188 31.535156 29.653953 31.535156 28.751953 C 31.535156 27.820953 32.300672 27.279359 33.763672 27.193359 L 36.375 27 z"
      fill="#000"
    />
  </Svg>
);

const creditCards = [
  {
    id: "1",
    brand: "mastercard",
    last4: "4236",
    name: "Stanly Weber",
    expiry: "08/25",
    color: "#2D3A8C",
  },
  {
    id: "2",
    brand: "mastercard",
    last4: "1357",
    name: "Stanly Weber",
    expiry: "08/25",
    color: "#4B286D",
  },
];

const others = [
  {
    id: "paypal",
    label: "PayPal",
    icon: <PayPalIcon />,
  },
  {
    id: "googlepay",
    label: "Google Pay",
    icon: <GooglePayIcon />,
  },
  {
    id: "applepay",
    label: "Apple Pay",
    icon: <ApplePayIcon />,
  },
];

const PaymentMethodsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // Filter and reverse the others array based on platform
  const filteredOthers = React.useMemo(() => {
    let arr = [...others];
    if (Platform.OS === "android") {
      arr = arr.filter((item) => item.id !== "applepay");
    }
    if (Platform.OS === "ios") {
      arr = arr.filter((item) => item.id !== "googlepay");
    }
    return arr.reverse();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f7f8fa" }}
      contentContainerStyle={{ padding: 20 }}
    >
      <Navbar title="Payment Methods" />
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Credit Card</Text>
        <Text style={styles.sectionCount}>
          {creditCards.length} Cards Added
        </Text>
      </View>
      {creditCards.map((card, idx) => (
        <View
          key={card.id}
          style={[styles.cardBox, { backgroundColor: card.color }]}
        >
          <Text style={styles.cardLabel}>Credit Card</Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardNumber}>**** {card.last4}</Text>
            {/* You may want to replace this icon with an SVG as well if needed */}
            {/* <FontAwesome5 name="cc-mastercard" size={32} color="#FF5F00" /> */}
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardExpiry}>{card.expiry}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addCardBtn}
        onPress={() => navigation.navigate("AddPaymentMethodScreen")}
      >
        <Feather name="plus" size={20} color="#2D3A8C" />
        <Text style={styles.addCardText}>Add New Card</Text>
      </TouchableOpacity>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Others</Text>
      </View>
      {filteredOthers.map((item) => (
        <View key={item.id} style={styles.otherBox}>
          <View style={styles.otherIcon}>{item.icon}</View>
          <Text style={styles.otherLabel}>{item.label}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 18, color: "#222" },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#222" },
  sectionCount: { fontSize: 13, color: "#A0A3BD" },
  cardBox: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLabel: { color: "#fff", fontSize: 13, marginBottom: 8 },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardNumber: { color: "#fff", fontSize:18, fontWeight: "bold" },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  cardName: { color: "#fff", fontSize: 15 },
  cardExpiry: { color: "#fff", fontSize: 15 },
  addCardBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
    marginTop: 6,
  },
  addCardText: {
    color: "#2D3A8C",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  otherBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  otherIcon: { width: 32, height: 32, marginRight: 16, resizeMode: "contain" },
  otherLabel: { fontSize: 16, color: "#222" },
});

export default PaymentMethodsScreen;
