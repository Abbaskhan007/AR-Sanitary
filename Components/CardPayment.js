import { Text, Alert, TouchableOpacity, StyleSheet, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import Axios from "axios";
import constants from "../assets/constants";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { EMPTY_CART } from "../Redux/Constants";

function CardPayment({
  user,
  shippingAddress,
  paymentMethod,
  products,
  cart,
  emptyCart,
  amount,
}) {
  const [publishableKey, setPublishableKey] = useState("");
  const navigation = useNavigation();
  const stripe = useStripe();
  const [showModal, setShowModal] = React.useState(false);

  console.log("Publishable Key: ", publishableKey);

  const fetchPublishableKey = async () => {
    try {
      const response = await Axios.get(`${constants.url}/config`);
      setPublishableKey(response.data.publishableKey);
    } catch (e) {
      console.log(e);
      console.warn("Unable to fetch publishable key. Is your server running");
      Alert.alert(
        "Error",
        "Unable to fetch publishable key. Is you server running"
      );
    }
  };

  const onOk = () => {
    try {
      console.log("----------------");
      emptyCart(user);
      navigation.navigate("Drawer");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handlePayment = async () => {
    try {
      const { data } = await Axios.post(`${constants.url}/pay`, {
        amount,
        name: "khan",
        orderId: "007",
      });
      console.log("Response of Stripe", data);
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Test Inc.",
      });
      console.log("------ init Sheet-------", initSheet);
      if (initSheet.error) {
        return Alert.alert(
          "Error in initiating payment sheet: ",
          initSheet.error.message
        );
      }
      await new Promise(resolve => setTimeout(resolve, 2500));
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });
      console.log("present Shhet -------", presentSheet);
      if (presentSheet.error) {
        console.log("---------", presentSheet.error);
        return Alert.alert(
          "Error in present payment Sheet: ",
          presentSheet.error.message
        );
      } else {
        const orderData = {
          customerId: user,
          shippingAddress: shippingAddress._id,
          paymentMethod,
          amount: 400,
        };
        const promise = products.map(async product => {
          const { data } = await Axios.post(`${constants.url}/orders/create`, {
            ...orderData,
            ...product,
          });
          console.log("Data", data);
        });
        console.log("PRomises", promise);
        Promise.all(promise).then(() => {
          Alert.alert(
            "Order Completed",
            "Thank you for paying. Your Order is on the way",
            [
              {
                text: "Ok",
                onPress: () => onOk(),
              },
            ]
          );
        });
      }
    } catch (error) {
      console.log("Error------", error);
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier"
    >
      <TouchableOpacity onPress={handlePayment} style={styles.button}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e05f38",
    padding: 12,
    margin: 14,
    borderRadius: 8,
    marginBottom: 42,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modelButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const mapStateToProps = state => {
  const products = state.cart.cart.map(item => ({
    productId: item.product._id,
    quantity: item.quantity,
    sellerId: item.product.seller,
    storeId: item.product.store,
  }));
  console.log("-----------------", state.orderDetails.shippingAddress);
  return {
    seller: state.seller,
    user: state.user.user._id,
    shippingAddress: state.orderDetails.shippingAddress,
    paymentMethod: state.orderDetails.paymentMethod,
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCart: async userId => {
      console.log("Emptying Cart------");
      const { data } = await Axios.delete(
        `${constants.url}/cart/emptyCart/${userId}`
      );
      console.log("Data of empty cart-----", data);
      dispatch({ type: EMPTY_CART });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPayment);
