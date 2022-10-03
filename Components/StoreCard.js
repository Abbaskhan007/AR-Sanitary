import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import StarRating from "./StarRating";
import { useNavigation } from "@react-navigation/native";

export default function StoreCard({ item }) {
  const navigation = useNavigation();
  console.log("Item-----------------", item);
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
    

        <View style={styles.categoryRow}>
      
          <Text style={styles.category}>{item.category[0]}</Text>
          {item.category.length > 1 && (
            <Text style={styles.more}>{item.category.length - 1} more</Text>
          )}
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
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
    height: 155,
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
    fontSize: 18,
    fontWeight: "500",
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
    marginBottom: 2,
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
});
