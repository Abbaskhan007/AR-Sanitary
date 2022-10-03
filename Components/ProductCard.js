import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import StarRating from "./StarRating";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import constants from "../assets/constants";
import { connect } from "react-redux";
import Axios from "axios";
import {
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_FETCH_REQUEST_SUCCESS,
} from "../Redux/Constants";

function ProductCard({ item, seller, fetchProducts }) {
  const navigation = useNavigation();



  const onDeleteProduct = async e => {
    e.stopPropagation();
    try {
      const response = await Axios.delete(
        `${constants.url}/products/delete/${item._id}`
      );
      console.log("Response", response);
      if (response.status === 200) {
        fetchProducts();
      }
    } catch (err) {
      Alert.alert(err);
    }
  };


  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item._id })
      }
      style={styles.productContainer}
    >
      {item.seller === seller && (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={e => onDeleteProduct(e)}
            style={styles.icons}
          >
            <MaterialIcons name="delete" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => navigation.navigate("EditProductScreen", item)}
            style={styles.icons}
          >
            <MaterialIcons name="mode-edit" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item?.images[0].url }} />
      </View>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
        <View style={styles.storeDetailRow}>
          <Text style={styles.detail}>by</Text>
          <Text style={[styles.detail, styles.storeName]}>Abbas</Text>
        </View>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>

        <View style={styles.lastRow}>
          <View>
            <StarRating rating={item.rating} />
            <Text style={styles.price}>{`Rs. ${item.price}`}</Text>
          </View>

          {/* <TouchableOpacity>
            <View style={styles.buttonContainer}>
              <AntDesign name="plus" size={24} color="#fff" />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    height: 172,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 6,
  },

  imageContainer: {
    width: "43%",
    padding: 10,
    backgroundColor: constants.bgColor,
    borderRadius: 22,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 22,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 4,
  },
  detail: {
    color: "#615e5c",
    fontSize: 16,
  },
  description: {
    color: "gray",
    marginTop: 8,
    fontSize: 14,
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 6,
  },
  storeDetailRow: {
    flexDirection: "row",
  },
  storeName: { fontWeight: "600", marginLeft: 4 },
  infoContainer: {
    flex: 1,
    paddingLeft: 25,
  },

  lastRow: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6365f1",
    borderRadius: 8,
  },
  iconContainer: {
    position: "absolute",
    zIndex: 50,
    right: 4,
    top: 8,
    flexDirection: "row",
  },
  icons: {
    backgroundColor: "rgba(0,0,0,0.6)",
    marginHorizontal: 4,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
  },
});

const mapStateToProps = state => {
  return {
    seller: state.seller._id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: async () => {
      dispatch({ type: PRODUCT_FETCH_REQUEST });
      try {
        const { data } = await Axios.get(
          `${constants.url}/products/getProducts`
        );
        dispatch({
          type: PRODUCT_FETCH_REQUEST_SUCCESS,
          payload: data,
        });
      } catch (err) {
        console.log("Error in product fetching", err);
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
