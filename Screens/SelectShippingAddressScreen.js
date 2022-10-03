import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import constants from "../assets/constants";
import ShippingAddressBox from "../Components/ShippingAddressBox";
import Header from "../Components/Header";
import { useIsFocused } from "@react-navigation/native";
import ActivitySteps from "../Components/ActivitySteps";

function SelectShippingAddressScreen({ user, navigation }) {
  const [shippingData, setShippingData] = useState([]);
  const isFocused = useIsFocused();
  const fetchAddresses = async () => {
    const { data } = await Axios.get(
      `${constants.url}/shippingAddress/${user._id}`
    );
    console.log("_________________", data);
    setShippingData(data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useLayoutEffect(() => {
    if (!user.name) {
      navigation.replace("LoginScreen");
    }
  });
  console.log("____", shippingData);
  return (
    <View style={styles.container}>
      <Header />
      <View style={{ marginTop: 14 }} />
      <ActivitySteps step={2} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Shipping Address", { action: "new" })
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add Address</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        data={shippingData}
        renderItem={({ item }) => <ShippingAddressBox address={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    paddingTop: 22,
  },
  button: {
    backgroundColor: "rgba(46, 113, 219, 0.2)",
    borderColor: "#447fdb",
    borderWidth: 2,
    padding: 14,
    borderRadius: 8,
    borderStyle: "dotted",
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#447fdb",
    textAlign: "center",
    fontWeight: "500",
  },
});

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchShippingAddress: async () => {},
  };
};

export default connect(mapStateToProps)(SelectShippingAddressScreen);
