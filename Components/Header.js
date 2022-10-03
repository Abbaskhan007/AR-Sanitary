import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import BackButton from "./BackButton";

export default function Header({ Left, Right, color = "#000", title }) {
  const route = useRoute();
  console.log("Route", route.name);
  return (
    <View style={styles.container}>
      <BackButton color={color} />
      <Text style={[styles.title, !Right && { marginLeft: -52 }, { color }]}>
        {title || route.name}
      </Text>
      {Right && <Right />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 18,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",

    flex: 1,
  },
});
