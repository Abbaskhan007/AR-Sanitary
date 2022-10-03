import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function OrderBox({ order }) {
  const navigation = useNavigation();

  let bgStatus =
    order.status === "Pending"
      ? "#fed7aa"
      : order.status === "EnRoute"
      ? "#fef3c7"
      : order.status === "Delivered"
      ? "#bbf7d0"
      : "#fca5a5";
  let textStatus =
    order.status === "Pending"
      ? "#f97316"
      : order.status === "EnRoute"
      ? "#facc15"
      : order.status === "Delivered"
      ? "#4ade80"
      : "#f87171";

  let bgPayment = order.paymentMethod === "bank" ? "#a5f3fc" : "#c7d2fe";
  let textPayment = order.paymentMethod === "bank" ? "#22d3ee" : "#818cf8";

  console.log("--------------", order.storeId);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Order Id: {order._id}</Text>
        <Text style={styles.date}>
          Placed on {moment(order.createdAt).format("YYYY-MM-DD")}
        </Text>
      </View>
      <View style={styles.storeRow}>
        <Text style={styles.storeName}>By</Text>
        <Image
          style={styles.storeImage}
          source={{ uri: order.storeId.image }}
        />
        <Text style={styles.storeName}>{order.storeId.name}</Text>
      </View>
      <View style={styles.topRow}>
        <Image
          style={styles.image}
          source={{ uri: order.productId.images[0].url }}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{order.productId.name}</Text>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.price}>Rs. {order.productId.price}</Text>
              <Text style={{ color: "gray" }}>x {order.quantity}</Text>
            </View>
            <View>
              <Text style={styles.price}>
                {order.productId.price} x {order.quantity} = Rs.{" "}
                {order.productId.price * order.quantity}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.btnRow}>
        <View style={[styles.btn, { backgroundColor: bgStatus }]}>
          <Text style={[styles.btnText, { color: textStatus }]}>
            {order.status}
          </Text>
        </View>
        <View style={[styles.btn, { backgroundColor: bgPayment }]}>
          <Text style={[styles.btnText, { color: textPayment }]}>
            {order.paymentMethod}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderDetail", order._id)}
          style={[styles.btn, {}]}
        >
          <Text style={styles.btnText}>View Order</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
  date: {
    color: "gray",
    marginVertical: 4,
    marginBottom: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
    flex: 1,
  },
  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  btn: {
    padding: 10,
    borderRadius: 8,
    width: 110,
    backgroundColor: "#e5e7eb",
  },
  btnText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#9ca3af",
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  storeName: {
    fontSize: 16,
    color: "gray",
  },
  storeImage: {
    height: 35,
    width: 35,
    borderRadius: 70,
    marginHorizontal: 8,
  },
});
