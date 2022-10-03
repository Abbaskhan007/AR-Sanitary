import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
  TouchableOpacity
} from "react-native";
import constant from "../assets/constants";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import Header from "../Components/Header";
import { Foundation } from "@expo/vector-icons";
import Axios from "axios";
import constants from "../assets/constants";

function ShippingAddressScreen({ user, route, navigation }) {
  const { shippingAddress, action } = route.params;
  const [name, setName] = useState(shippingAddress?.name);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress?.phoneNumber);
  const [province, setProvince] = useState(shippingAddress?.province);
  const [city, setCity] = useState(shippingAddress?.city);
  const [area, setArea] = useState(shippingAddress?.area);
  const [address, setAddress] = useState(shippingAddress?.address);
  const [place, setPlace] = useState(shippingAddress?.place ?? "home");
  const [openSwitch, setOpenSwitch] = useState(
    shippingAddress?.default ?? false
  );

  console.log(action);

  const onSave = async () => {
    if (
      !name ||
      !phoneNumber ||
      !province ||
      !city ||
      !area ||
      !address ||
      !place
    ) {
      return Alert.alert("Please Fill All the Input Fields");
    }
    const shipping = {
      name,
      phoneNumber,
      province,
      city,
      area,
      address,
      place,
      default: openSwitch,
      user: user._id,
    };

    console.log("Shipping", shipping);

    if (action === "new") {
      const { data } = await Axios.post(`${constant.url}/shippingAddress/add`, {
        userId: user._id,
        shipping,
      });
      console.log("Data", data);
      Alert.alert("Shipping Address Added Successfully");
      navigation.goBack();
    } else {
      const { data } = await Axios.put(`${constant.url}/shippingAddress/edit`, {
        shippingData: shipping,
        shippingAddressId: shippingAddress._id,
      });
      console.log("Data of editing", data);
      Alert.alert("Shipping Address Updated Successfully");
      navigation.goBack();
    }
  };

  const onDelete = async () => {
    console.log("____________")
    const response = await Axios.delete(
      `${constants.url}/shippingAddress/delete/${shippingAddress._id}`
    );
    console.log("Response of Delete", response);
    if (response.status === 200) {
      Alert.alert("Address Deleted Successfully");
      navigation.goBack();
    } else {
      Alert.alert(response.data.message);
    }
  };



  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#fff" }}>
        <Header />
      </View>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.heading}>Full Name</Text>
          <TextInput
            style={styles.textField}
            placeholder="Full Name"
            onChangeText={setName}
            value={name}
          />

          <Text style={styles.heading}>Phone Number</Text>
          <TextInput
            style={styles.textField}
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
          />
          <Text style={styles.heading}>Province</Text>
          <TextInput
            style={styles.textField}
            placeholder="Province"
            onChangeText={setProvince}
            value={province}
          />
          <Text style={styles.heading}>City</Text>
          <TextInput
            style={styles.textField}
            placeholder="City"
            onChangeText={setCity}
            value={city}
          />
          <Text style={styles.heading}>Area</Text>
          <TextInput
            style={styles.textField}
            placeholder="Area"
            onChangeText={setArea}
            value={area}
          />
          <Text style={styles.heading}>Address</Text>
          <TextInput
            style={styles.textField}
            placeholder="Address"
            onChangeText={setAddress}
            value={address}
          />
        </View>
        <View style={styles.placeContainer}>
          <Text style={styles.boxHeading}>
            Select a lavel for effective delivery
          </Text>
          <View style={styles.boxesRow}>
            <TouchableOpacity
              onPress={() => setPlace("office")}
              style={[
                styles.box,
                place === "office" && {
                  backgroundColor: "rgba(58, 129, 207, 0.08)",
                  borderColor: "#3a81cf",
                },
              ]}
            >
              <Foundation
                name="shopping-bag"
                size={24}
                color={place === "office" ? "#3a81cf" : "#adacac"}
              />
              <Text
                style={[
                  styles.boxText,
                  place === "office" ? { color: "#3a81cf" } : { color: "gray" },
                ]}
              >
                OFFICE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPlace("home")}
              style={[
                styles.box,
                place === "home" && {
                  backgroundColor: "rgba(237, 112, 81, 0.15)",
                  borderColor: "#ed7051",
                },
              ]}
            >
              <Foundation
                name="shopping-bag"
                size={24}
                color={place === "home" ? "#ed7051" : "#adacac"}
              />
              <Text
                style={[
                  styles.boxText,
                  place === "home" ? { color: "#ed7051" } : { color: "gray" },
                ]}
              >
                HOME
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.defaultText}>Make Default Shipping Address</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#e05f38" }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setOpenSwitch(!openSwitch)}
            value={openSwitch}
          />
        </View>
        <View style={{ backgroundColor: "#fff", paddingTop: 12 }}>
          <TouchableOpacity onPress={onDelete} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "#fff", paddingTop: 12 }}>
        <TouchableOpacity onPress={onSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 12
  },
  form: {
    padding: 14,
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "left",
    fontSize: 18,
    alignSelf: "flex-start",
    fontWeight: "500",
    color: "#141212",
  },
  textField: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#d1d5db",
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "400",
    paddingHorizontal: 12,
  },
  saveButton: {
    backgroundColor: "#e05f38",
    padding: 12,
    margin: 14,
    borderRadius: 8,
  },
  saveButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
  boxHeading: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 6,
  },
  boxesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  box: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 18,
    paddingHorizontal: 24,
    marginHorizontal: 12,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "rgba(227, 223, 222, 0.4)",
    borderColor: "gray",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  placeContainer: {
    paddingHorizontal: 14,
    paddingVertical: 22,
    backgroundColor: "#fff",
    marginVertical: 14,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: 14,
    justifyContent: "space-between",
  },
  defaultText: {
    fontSize: 16,
  },
});

export default connect(mapStateToProps)(ShippingAddressScreen);
