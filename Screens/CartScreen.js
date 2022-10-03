import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import CartItem from "../Components/CartItem";
import Header from "../Components/Header";
import ActivitySteps from "../Components/ActivitySteps";

function CartScreen({ cart, navigation }) {
  console.log("Real Cart------------------------------------------", cart);

  if (cart.length > 0) {
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
      <View style={{ padding: 18, flex: 1 }}>
        <Header />
        <ActivitySteps step={1} />
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.product._id}
            data={cart}
            renderItem={({ item }) => <CartItem item={item} />}
            ListFooterComponent={() => (
              <View>
                <View style={styles.orderSummaryContainer}>
                  <Text
                    style={[
                      styles.title,
                      { textAlign: "center", marginBottom: 14 },
                    ]}
                  >
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
                    <Text style={styles.orderSummaryText}>
                      Shipping Charges
                    </Text>
                    <Text style={styles.orderSummaryText}>
                      {shippingCharges}
                    </Text>
                  </View>
                  <View style={styles.orderSummaryRow}>
                    <Text style={styles.orderSummaryText}>Total Price</Text>
                    <Text style={styles.orderSummaryText}>
                      {orderPrice + shippingCharges}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SelectShippingScreen")}
                  style={styles.checkoutButton}
                >
                  <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Image
        style={styles.image}
        source={{
          uri: "https://res.cloudinary.com/dlxyvl6sb/image/upload/v1664562800/sanitary-store/empty_cart_w1vwci.png",
        }}
      />
      <Text style={styles.message}>No Items Present in the Cart</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Products")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    paddingTop: 22,
  },
  message: {
    fontSize: 20,
    fontWeight: "500",
    color: "gray",
    textAlign: "center",
    marginTop: -42,
  },
  button: {
    backgroundColor: "#e63ff8",
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  checkoutButton: {
    backgroundColor: "#637aff",
    padding: 12,
    borderRadius: 6,
    marginTop: 18,
    marginBottom: 125,
  },
  checkoutText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
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
    marginTop: 24,
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
  };
};

export default connect(mapStateToProps)(CartScreen);
