import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Axios from "axios";

// Add store in useEffect dependencies

import constants from "../assets/constants";
import {
  ADD_TO_CART_LOCAL,
  DELETE_TO_CART_LOCAL,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "../Redux/Constants";
import { connect } from "react-redux";

function CartItem({
  item,
  addToCartLocal,
  updateCart,
  user,
  deleteProduct,
  products,
  store,
  cart,
  deleteToCartLocal,
}) {
  const deleteHandler = () => {
    console.log("Deleting");
    if (user.name) {
      deleteProduct({
        userId: user._id,
        productId: item.product._id,
        quantity: item.quantity,
      });
    } else {
      deleteToCartLocal(item.product._id);
    }
  };
  console.log("Items Cart", item);
  const [quantity, setQuantity] = useState(item.quantity);
  const quantityHandler = qty => {
    if (qty === 1) {
      if (quantity === item.product.inStock) {
        return;
      } else {
        setQuantity(prevQty => prevQty + qty);
      }
    } else {
      if (quantity === 1) return;
      setQuantity(prevQty => prevQty + qty);
    }
  };

  useEffect(() => {
    if (user.name) {
      updateCart({
        productId: item._id,
        userId: user._id,
        quantity,
      });
    } else {
      addToCartLocal(item.product, quantity);
    }
  }, [quantity, products]);

  return (
    <View style={styles.conatiner}>
      <Image
        style={styles.image}
        source={{
          uri: item.product?.images[0].url,
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.product.name}</Text>
        <View style={{flexDirection: "row"}}>
          <Text style={styles.category}>{item.product.category}</Text>
        </View>
        {/* <Text style={styles.category}>{item.product.category}</Text> */}
        <Text style={styles.price}>Rs. {item.product.price}</Text>
        <View style={styles.lastRow}>
          <View style={styles.quantityRow}>
            <TouchableOpacity onPress={() => quantityHandler(1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity onPress={() => quantityHandler(-1)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={deleteHandler} style={styles.deleteButton}>
            <AntDesign name="close" size={16} color="#6f7682" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    width: "100%",
    height: 160,
    borderRadius: 18,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    marginTop: 16,
  },
  image: {
    width: "42%",
    height: "100%",
    borderRadius: 14,
    marginRight: 18,
    backgroundColor: constants.bgColor,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginTop: 10,
    color: "#6f7682",
  },
  // category: {
  //   fontSize: 18,
  //   color: "#6f7682",
  //   fontWeight: "500",
  // },

  category: {
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    backgroundColor: "#e4e4e4",
    textAlign: "center",
    paddingHorizontal: 14,
  
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qty: {
    width: 40,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  quantityButton: {
    backgroundColor: "#637aff",
    color: "#fff",
    fontSize: 26,
    height: 35,
    width: 35,
    fontWeight: "500",
    overflow: "hidden",
    textAlign: "center",
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  
  },
  lastRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  deleteButton: {
    width: 25,
    height: 25,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#6f7682",
  },
});

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    user: state.user.user,
    products: state.productList.products,
    // store: state.store.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCart: async productData => {
      console.log("Product Data", productData);
      try {
        const { data } = await Axios.post(
          `${constants.url}/cart/changeQuantity`,
          productData
        );
        console.log("Data", data);
        dispatch({
          type: UPDATE_CART,
          payload: data.products,
        });
      } catch (err) {
        console.log("Error in change quantity", err);
      }
    },
    deleteProduct: async productData => {
      const { data } = await Axios.delete(
        `${constants.url}/cart/deleteProduct?productId=${productData.productId}&userId=${productData.userId}`
      );
      console.log("Data", data);
      dispatch({
        type: REMOVE_FROM_CART,
        payload: data.products,
      });
    },
    addToCartLocal: (product, qty) => {
      dispatch({
        type: ADD_TO_CART_LOCAL,
        payload: { product, quantity: qty },
      });
    },
    deleteToCartLocal: id => {
      dispatch({
        type: DELETE_TO_CART_LOCAL,
        payload: id,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
