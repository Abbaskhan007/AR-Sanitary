import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import StarRating from "./StarRating";

export default function ReviewBox({ photo, review, rating, createdAt, name }) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.image} source={{ uri: photo }} />
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{name}</Text>
          <StarRating rating={rating} />
        </View>
      </View>
      <Text style={styles.review}>{review}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderColor: "#d4d4d4",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 3,
  },
  rightContainer: {
    marginLeft: 12,
  },
  review: {
    color: "gray",
  },
});
