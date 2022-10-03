import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import constants from "../assets/constants";
import StarRating from "./StarRating";
import { useNavigation } from "@react-navigation/native";

export default function SellerDashboardStore({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("StoreDetailsScreen", { storeId: item._id })
      }
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>
          <View style={styles.ratingRow}>
            <StarRating rating={item.rating} />
            <Text style={styles.ratingNum}>({item.rating})</Text>
          </View>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 210,

    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    margin: 8,
  },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: constants.bgColor,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
  infoContainer: {
    padding: 8,
    justifyContent: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    justifyContent: "center",
  },
  ratingNum: {
    color: "gray",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 5,
  },
});
