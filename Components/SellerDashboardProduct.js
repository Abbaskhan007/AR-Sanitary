import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import StarRating from "./StarRating";
import constants from "../assets/constants";
import { useNavigation } from "@react-navigation/native";

export default function SellerDashboardProduct({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetail", { productId: item._id })
      }
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: item.images[0].url }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.ratingRow}>
          <StarRating rating={item.rating} />
          <Text style={styles.ratingNum}>({item.rating})</Text>
        </View>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingNum}>Rs.</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
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
  price: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
