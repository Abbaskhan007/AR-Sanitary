import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Header from "../Components/Header";
import Axios from "axios";
import constants from "../assets/constants";
import { connect } from "react-redux";
import OrderBox from "../Components/OrderBox";

function SellerOrders({ seller }) {
  const [orders, setOrders] = useState([]);
  const status = useRoute().params;
  const [activeTab, setActiveTab] = useState("all");
  console.log("Status", status);

  const fetchOrders = async () => {
    try {
      const { data } = await Axios.get(
        `${constants.url}/orders/sellerOrders/${seller}?status=${activeTab}`
      );
      setOrders(data);
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  console.log("Orders------", orders);

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  return (
    <ScrollView style={styles.root}>
      <Header />

      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => setActiveTab("all")}
          style={activeTab === "all" && styles.topBarButton}
        >
          <Text style={styles.topBarText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Pending")}
          style={activeTab === "Pending" && styles.topBarButton}
        >
          <Text style={styles.topBarText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("EnRoute")}
          style={activeTab === "EnRoute" && styles.topBarButton}
        >
          <Text style={styles.topBarText}>EnRoute</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Delivered")}
          style={activeTab === "Delivered" && styles.topBarButton}
        >
          <Text style={styles.topBarText}>Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("Cancelled")}
          style={activeTab === "Cancelled" && styles.topBarButton}
        >
          <Text style={styles.topBarText}>Cancelled</Text>
        </TouchableOpacity>
      </View>
      {orders.length == 0 ? (
        <View style={styles.noOrder}>
          <Text style={styles.noOrderText}>No Orders Present</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item._id}
          ListHeaderComponent={() => (
            <View
              style={{
                height: 8,
                backgroundColor: "#d1d5db",
                marginBottom: 12,
              }}
            />
          )}
          ListFooterComponent={() => (
            <View
              style={{
                height: 8,
                backgroundColor: "#d1d5db",
                marginBottom: 12,
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 8,
                backgroundColor: "#d1d5db",
                marginBottom: 12,
              }}
            />
          )}
          renderItem={({ item }) => <OrderBox order={item} />}
        />
      )}
      <View style={{height: 32}}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 22,
    marginBottom: 12,
    
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 24,
  },
  topBarButton: {
    borderBottomColor: "red",
    borderBottomWidth: 4,
  },
  topBarText: {
    fontSize: 15,
    paddingBottom: 2,
  },
  noOrder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 250
  
  },
  noOrderText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#9ca3af",
  },
});

const mapStateToProps = state => {
  return {
    seller: state.seller._id,
  };
};

export default connect(mapStateToProps, null)(SellerOrders);
