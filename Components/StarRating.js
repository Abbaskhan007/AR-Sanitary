import { FontAwesome, Feather } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function StarRating({ rating, color = "#6365f1" }) {
  if (rating < 1 && rating > 0) {
    return (
      <View>
        <FontAwesome name="star-half-empty" size={18} />
      </View>
    );
  } else if (rating >= 1 && rating < 1.5) {
    return (
      <View style={styles.container}>
        <FontAwesome name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
      </View>
    );
  } else if (rating >= 1.5 && rating < 2) {
    return (
      <View style={styles.container}>
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star-half-empty" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
      </View>
    );
  } else if (rating >= 2 && rating < 2.5) {
    return (
      <View style={styles.container}>
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />

        <Feather name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
      </View>
    );
  } else if (rating >= 2.5 && rating < 3) {
    return (
      <View style={styles.container}>
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star-half-empty" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
      </View>
    );
  } else if (rating >= 3 && rating < 3.5) {
    return (
      <View style={styles.container}>
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
      </View>
    );
  } else if (rating >= 3.5 && rating < 4) {
    return (
      <View style={styles.container}>
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star-half-empty" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
      </View>
    );
  } else if (rating >= 4 && rating < 4.5) {
    return (
      <View style={styles.container}>
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <Feather name="star" size={18} color={color} />
      </View>
    );
  } else if (rating >= 4.5 && rating < 5) {
    return (
      <View style={styles.container}>
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star-half-empty" size={18} color={color} />
      </View>
    );
  } else if (rating == 5) {
    return (
      <View style={styles.container}>
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
        <FontAwesome name="star" size={18} color={color} />
      </View>
    );
  } else {
    return <View></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
