import Spinner from "react-native-loading-spinner-overlay";
import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function LoadingIndicator({ loading }) {
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
