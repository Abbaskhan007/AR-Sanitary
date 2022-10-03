import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import constants from "../assets/constants";
import Axios from "axios";
import { connect } from "react-redux";
import {
  CART_DATA_REQUEST,
  CART_START,
  GET_CATEGORIES,
  GET_WORKERS_CATEGORIES,
  INITIAL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_FETCH_REQUEST_SUCCESS,
  PRODUCT_SEARCH,
  SELLER_START,
  START_USER,
} from "../Redux/Constants";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../Components/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import ProductsFilter from "../Components/ProductsFilter";
import LoadingScreen from "./LoadingScreen";
import ImageSearch from "../Components/ImageSearch";
import BottomSpace from "../Components/BottomSpace";

function ProductScreen({
  fetchProducts,
  products,
  initialUser,
  initialCart,
  initialSeller,
  fetchUserCart,
  user,
  getCategories,
  searchHandler,
  getWorkerCategories,
  loading,
}) {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  console.log("_____________________________________,", loading);

  const onSearch = value => {
    searchHandler(value);
    setSearch(value);
  };

  const getUser = () => {
    console.log("Getting the user");
    AsyncStorage.getItem("user")
      .then(res => res)
      .then(json => {
        if (json) {
          initialUser(JSON.parse(json));
          console.log("JSON_______", json);
        } else {
          initialUser({});
          console.log("2...JSON_______", json);
        }
      })
      .catch(err => console.log("User initializing error", err));
  };

  const getCart = () => {
    AsyncStorage.getItem("cart")
      .then(res => res)
      .then(json => {
        if (json) {
          initialCart(JSON.parse(json));
        } else {
          initialCart([]);
        }
      })

      .catch(err => console.log("Cart initializing error", err));
  };

  const getSeller = () => {
    AsyncStorage.getItem("seller")
      .then(res => res)
      .then(json => {
        if (json) {
          initialSeller(JSON.parse(json));
        } else {
          initialSeller({});
        }
      })

      .catch(err => console.log("Seller initializing error", err));
  };

  useEffect(() => {
    console.log("Categories*****************___________________________");
    getUser();
    getCart();
    fetchProducts();
    getCategories();
    getWorkerCategories();
    getSeller();
  }, []);

  useEffect(() => {
    if (user.name) {
      console.log("User", user);
      fetchUserCart(user._id);
    }
  }, [user]);

  console.log("Search....", isModalVisible);
  if (loading) {
    console.log("Loading __", loading);
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <SearchBar
          search={search}
          placeholder="Search Product"
          setSearch={onSearch}
        />
        <ImageSearch />
        <AntDesign
          onPress={() => setModalVisible(!isModalVisible)}
          name="filter"
          size={28}
          color="black"
          style={{ marginLeft: 12 }}
        />
      </View>

      <ProductsFilter
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        categories={categories}
        keyword={search}
      />

      {products.products.length > 0 ? (
        <FlatList
          data={products.products}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
          renderItem={({ item, index }) => <ProductCard item={item} />}
          ListFooterComponent={<BottomSpace />}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{fontSize: 22, fontWeight: "500", color: "#d946ef"}}>No Product Present</Text>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = state => {
  //console.log("State----------------", state);
  return {
    products: state.productList,
    user: state.user.user,
    loading: state.loading.loading,
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
        console.log("Error Message", err.message);
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
    },
    initialUser: user => {
      console.log("User payload in..", user);
      dispatch({
        type: START_USER,
        payload: user,
      });
    },
    initialCart: cart => {
      dispatch({
        type: CART_START,
        payload: cart,
      });
    },
    initialSeller: seller => {
      console.log("SEller", seller);
      dispatch({
        type: SELLER_START,
        payload: seller,
      });
    },
    fetchUserCart: async userId => {
      try {
        const { data } = await Axios.get(`${constants.url}/cart/${userId}`, {
          userId,
        });
        dispatch({
          type: CART_DATA_REQUEST,
          payload: data.products ? data.products : [],
        });
      } catch (err) {
        console.log("Error in user Cart fetching", err);
      }
    },
    getCategories: async () => {
      console.log("Categories*****************___________________________!!!");
      try {
        const { data } = await Axios.get(`${constants.url}/categories`);
        dispatch({
          type: GET_CATEGORIES,
          payload: data,
        });
      } catch (err) {
        console.log("Error", err);
      }
    },
    getWorkerCategories: async () => {
      console.log("Categories*****************___________________________!!!");
      try {
        const { data } = await Axios.get(`${constants.url}/workerCategories`);
        console.log("Worker Categories________", data);
        dispatch({
          type: GET_WORKERS_CATEGORIES,
          payload: data,
        });
      } catch (err) {
        console.log("Error", err);
      }
    },
    searchHandler: async keyword => {
      console.log("Keyword", keyword);
      try {
        const { data } = await Axios.post(
          `${constants.url}/products/searchProduct`,
          {
            keyword,
          }
        );
        dispatch({
          type: PRODUCT_SEARCH,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: constants.bgColor,
    paddingTop: constants.paddingTop,
  },

  seperator: {
    height: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 22,
  },
});
