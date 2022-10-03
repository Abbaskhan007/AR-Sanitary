import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SellerDashboardProduct from "../Components/SellerDashboardProduct";
import Axios from "axios";
import constants from "../assets/constants";
import SellerDashboardStore from "../Components/SellerDashboardStore";
import Header from "../Components/Header";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import CreateStoreForm from "../Components/CreateStoreForm";
import { FETCH_SELLER_DATA } from "../Redux/Constants";

function SellerDashboard({
  user,
  seller,
  products,
  store,
  fetchSellerData,
  navigation,
}) {
  const [productData, setProductData] = useState([]);
  const [stores, setStores] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchProductData = async () => {
    try {
      const response = await Axios.get(
        `${constants.url}/products//getSellerProducts/${seller._id}`
      );
      setProductData(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await Axios.get(
        `${constants.url}/stores/getStores/${seller._id}`
      );
      console.log("Response", response.data);
      setStores(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchStores();
  }, [products, store, isModalVisible]);

  return (
    <View style={styles.container}>
      <Header />
      {isModalVisible && (
        <CreateStoreForm
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      <View style={styles.stores}>
        <View style={styles.storeRow}>
          <Text style={styles.heading}>Stores</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.button}
          >
            <Ionicons name="md-create-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Create Store</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={stores}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <SellerDashboardStore item={item} />}
          ItemSeparatorComponent={() => {
            return <View style={styles.seperator} />;
          }}
        />
      </View>
      <View style={styles.products}>
        <Text style={styles.heading}>Products</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={productData}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <SellerDashboardProduct item={item} />}
          ItemSeparatorComponent={() => {
            return <View style={styles.seperator} />;
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("SellerOrders")}
        style={styles.orderButton}
      >
        <FontAwesome5 name="box" size={22} color="#fff" />
        <Text style={styles.orderText}>View Orders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 24,
  },
  seperator: {
    width: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
  },
  stores: {
    marginBottom: 18,
  },
  products: {
    marginBottom: 15,
  },
  storeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#818cf8",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 5,
  },
  orderButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#818cf8",
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  orderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
});

const mapStateToProps = state => {
  return {
    user: state.user.user,
    seller: state.seller,
    products: state.productList.products,
    store: state.store.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSellerData: async user => {
      try {
        const response = await Axios.get(
          `${constants.url}/seller/getSeller/${user}`
        );
        console.log("Response", response.data);
        dispatch({ type: FETCH_SELLER_DATA, payload: response.data });
      } catch (err) {
        alert(err.message);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerDashboard);
