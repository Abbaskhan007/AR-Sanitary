import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ErrorBox({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fca5a5",
    padding: 12,
    marginBottom: 22,
    borderRadius: 8,
    width: "100%",
  },
  text: {
    color: "#b91c1c",
    fontSize: 18,
    fontWeight: "500",
  },
});
