import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import constants from "../assets/constants";
import StoreHomeScreen from "./StoreHomeScreen";
import StoreProductScreen from "./StoreProductScreen";
import BackButton from "../Components/BackButton";
import { connect } from "react-redux";
import Header from "../Components/Header";
import StarRating from "../Components/StarRating";

function StoreDetailsScreen({ route, store }) {
  const [storeData, setStoreData] = useState({});
  const { storeId } = route.params;
  const [activeTab, setActiveTab] = useState("home");

  const getStoreData = async () => {
    const { data } = await Axios.get(
      `${constants.url}/stores/getStore/${storeId}`
    );
    // console.log("Store Data_________________________", data);
    setStoreData(data);
  };

  useEffect(() => {
    getStoreData();
  }, [store]);

  const activeStyle = {
    borderColor: "#6365f1",
    borderWidth: 2,
  };
  const activeText = {
    color: "#6365f1",
    fontWeight: "600",
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{ position: "absolute", top: 0, zIndex: 30, paddingTop: 12 }}
      >
        <Header />
      </View>

      <Image style={styles.bannerImage} source={{ uri: storeData.image }} />
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => setActiveTab("home")}
          style={[styles.button, activeTab === "home" && activeStyle]}
        >
          <Text style={[styles.buttonText, activeTab === "home" && activeText]}>
            Home Page
          </Text>
        </TouchableOpacity>
        <View style={{ width: 14 }} />
        <TouchableOpacity
          onPress={() => setActiveTab("products")}
          style={[styles.button, activeTab === "products" && activeStyle]}
        >
          <Text
            style={[styles.buttonText, activeTab === "products" && activeText]}
          >
            All Products
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {activeTab === "home" ? (
          <StoreHomeScreen store={storeData} />
        ) : (
          <StoreProductScreen store={storeData} />
        )}
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bannerImage: {
    width: 500,
    height: 250,
    resizeMode: "cover",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  button: {
    flex: 1,
    borderColor: "#d4d4d4",
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 19,
    color: "gray",
  },
});

const mapStateToProps = state => {
  return {
    store: state.store.data,
  };
};

export default connect(mapStateToProps)(StoreDetailsScreen);
