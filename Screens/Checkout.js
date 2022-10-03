import { View, Text, Alert, StyleSheet, Image, ScrollView } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import CardPayment from "../Components/CardPayment";
import { connect } from "react-redux";
import Header from "../Components/Header";
import ActivitySteps from "../Components/ActivitySteps";

function Checkout({ cart, paymentMethod, shippingAddress, user }) {
  console.log("Props_:", cart, paymentMethod, shippingAddress);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const orderPrice = cart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
  const shippingCharges = cart.reduce(
    (total, item) => total + item.product.shippingPrice,
    0
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header />
      <View style={{ marginTop: 14 }} />
      <ActivitySteps step={4} />
      <View style={styles.paymentRow}>
        <Text style={styles.title}>Payment Method </Text>
        <Text style={styles.title}>{paymentMethod}</Text>
      </View>
      <View style={styles.shippingRow}>
        <Text style={styles.title}>Shipping Address </Text>
        <View style={styles.addressRow}>
          <Text style={styles.address}>
            {shippingAddress.address}, {shippingAddress.area},
            {shippingAddress.city}, {shippingAddress.province}
          </Text>
        </View>
      </View>
      <View style={styles.orders}>
        <Text style={styles.title}>Order Items</Text>
        {cart.map(item => (
          <>
            <View style={styles.orderContainer}>
              <Image
                style={styles.orderImage}
                source={{ uri: item.product.images[0].url }}
              />
              <Text style={styles.orderName}>{item.product.name}</Text>
              <Text style={styles.price}>
                {item.product.price} x {item.quantity} = Rs.{" "}
                {item.product.price * item.quantity}
              </Text>
            </View>
            <View style={styles.line} />
          </>
        ))}
      </View>
      <View style={styles.orderSummaryContainer}>
        <Text style={[styles.title, { textAlign: "center", marginBottom: 14 }]}>
          OrderSummary
        </Text>
        <View style={styles.orderSummaryRow}>
          <Text style={styles.orderSummaryText}>Total Products</Text>
          <Text style={styles.orderSummaryText}>{cart.length}</Text>
        </View>
        <View style={styles.orderSummaryRow}>
          <Text style={styles.orderSummaryText}>Total Items</Text>
          <Text style={styles.orderSummaryText}>{totalItems}</Text>
        </View>
        <View style={styles.orderSummaryRow}>
          <Text style={styles.orderSummaryText}>Order Price</Text>
          <Text style={styles.orderSummaryText}>{orderPrice}</Text>
        </View>
        <View style={styles.orderSummaryRow}>
          <Text style={styles.orderSummaryText}>Shipping Charges</Text>
          <Text style={styles.orderSummaryText}>{shippingCharges}</Text>
        </View>
        <View style={styles.orderSummaryRow}>
          <Text style={styles.orderSummaryText}>Total Price</Text>
          <Text style={styles.orderSummaryText}>
            {orderPrice + shippingCharges}
          </Text>
        </View>
      </View>
      <CardPayment amount={orderPrice + shippingCharges} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingVertical: 16,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 12,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
  shippingRow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 12,
    borderRadius: 8,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  address: {
    fontSize: 15,
    lineHeight: 20,
  },
  orders: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 14,
    marginVertical: 12,
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },
  orderImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  line: {
    backgroundColor: "#dedede",
    width: "75%",
    height: 1,
    alignSelf: "center",
  },
  orderName: {
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 16,
    flex: 1,
    color: "#292828",
  },
  price: {
    fontSize: 15,
    fontWeight: "500",
    color: "gray",
  },

  orderSummaryContainer: {
    backgroundColor: "#fff",
    padding: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff",
    marginVertical: 12,
    borderRadius: 12,
  },
  orderSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderSummaryText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
    color: "#292828",
  },
});

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    paymentMethod: state.orderDetails.paymentMethod,
    shippingAddress: state.orderDetails.shippingAddress,
    user: state.user,
  };
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps)(Checkout);
