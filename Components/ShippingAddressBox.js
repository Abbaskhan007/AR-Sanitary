import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { SELECT_SHIPPING_ADDRESS } from "../Redux/Constants";

function ShippingAddressBox({ address, selectShippingAddress }) {
  const navigation = useNavigation();

  const onSelect = () => {
    selectShippingAddress(address);
    navigation.navigate("SelectPaymentMethod");
  };

  return (
    <TouchableOpacity onPress={onSelect} style={styles.container}>
      <Ionicons name="location-sharp" size={24} color="black" />
      <View style={styles.column2}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{address.name}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Shipping Address", {
                shippingAddress: address,
                action: "edit",
              })
            }
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.phone}>{address.phoneNumber}</Text>
        <View style={styles.lastRow}>
          <View style={styles.placeContainer}>
            <Text style={styles.place}>{address.place}</Text>
          </View>
          <Text>{address.address}, </Text>
          <Text>{address.area}, </Text>
          <Text>{address.city}, </Text>
          <Text>{address.province}, </Text>
        </View>
        {address.default && (
          <View style={styles.defaultBox}>
            <Text style={styles.defaultBoxText}>Default shipping address</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    selectShippingAddress: address => {
      dispatch({
        type: SELECT_SHIPPING_ADDRESS,
        payload: address,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(ShippingAddressBox);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    margin: 12,
    borderRadius: 14,
    flexDirection: "row",
  },
  column2: {
    flex: 1,
    marginLeft: 15,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
  },
  editText: {
    color: "#447fdb",
    fontWeight: "500",
    textDecorationLine: "underline",
    fontSize: 18,
  },
  phone: {
    marginBottom: 8,
    marginTop: 12,
  },
  lastRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  placeContainer: {
    backgroundColor: "#447fdb",
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 4,
  },
  place: {
    color: "#fff",
    fontWeight: "500",
  },
  defaultBox: {
    borderColor: "#447fdb",
    borderWidth: 1,
    width: 185,
    padding: 4,
    borderRadius: 12,
    marginTop: 12,
  },
  defaultBoxText: {
    fontSize: 14,
    color: "#447fdb",
    textAlign: "center",
    fontWeight: "500",
  },
});
