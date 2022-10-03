import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import StarRating from "./StarRating";
import { useNavigation } from "@react-navigation/native";

export default function WorkerCard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("WorkerDetailsScreen", { workerId: item._id })
      }
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: item.images[0] }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.user.name}</Text>
        <View style={styles.categoryRow}>
          {/* {item.category.map(
            (ctg, index) =>
              index < 2 && (
                <Text item={ctg} style={styles.category}>
                  {ctg}
                </Text>
              )
          )} */}
          <Text style={styles.category}>{item.category[0]}</Text>
          {item.category.length > 1 && (
            <Text style={styles.more}>{item.category.length - 1} more</Text>
          )}
        </View>

        <Text style={styles.price}>{`Rs. ${item.price} / hour`}</Text>
        <Text style={styles.price}>{item.city}</Text>
        <View style={styles.ratingRow}>
          <StarRating rating={item.rating} />
          <Text style={styles.ratingNum}>( {item.rating} )</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 170,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 14,
  },
  image: {
    width: "40%",
    height: "100%",
    borderRadius: 12,
    marginRight: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 6,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
    color: "gray",
    marginRight: 12,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
  },
  ratingNum: {
    fontSize: 16,
    color: "gray",
    fontWeight: "600",
    marginLeft: 6,
  },
  description: {
    color: "gray",
    marginTop: 10,
    fontSize: 14,
    fontWeight: "400",
  },
  infoContainer: {
    flex: 1,
  },
  more: {
    color: "gray",
  },
  price: {
    color: "gray",
    fontWeight: "600",
    marginTop: 8,
    fontSize: 16,
  },
});
