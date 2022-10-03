import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ActivitySteps({ step }) {
  return (
    <View style={styles.container}>
      <View style={styles.step}>
        <View style={step >= 1 ? styles.activeLine : styles.inActiveLine} />
        <Text style={styles.title}>Cart</Text>
      </View>
      <View style={styles.step}>
        <View style={step >= 2 ? styles.activeLine : styles.inActiveLine} />
        <Text style={styles.title}>Address</Text>
      </View>
      <View style={styles.step}>
        <View style={step >= 3 ? styles.activeLine : styles.inActiveLine} />
        <Text style={styles.title}>Payment</Text>
      </View>
      <View style={styles.step}>
        <View style={step >= 4 ? styles.activeLine : styles.inActiveLine} />
        <Text style={styles.title}>Order</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 8,
  },
  step: {
    flex: 1,
  },
  activeLine: {
    height: 5,
    backgroundColor: "red",
    marginHorizontal: 4,
    borderRadius: 12,
  },
  inActiveLine: {
    height: 5,
    marginHorizontal: 4,
    backgroundColor: "gray",
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    paddingTop: 8
  },
});
