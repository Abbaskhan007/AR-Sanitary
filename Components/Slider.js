import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

export default function RangeSlide({ min, max, setMin, setMax, MAX, MIN }) {
  const width = Dimensions.get("window").width;
  console.log(min, max);
  return (
    <View style={styles.container}>
      <MultiSlider
        isMarkersSeparated={true}
        values={[parseInt(min), parseInt(max)]}
        min={MIN}
        max={MAX}
        enableLabel={true}
        valuePrefix="Rs."
        valueSuffix="Rs."
        sliderLength={width - 80}
        onValuesChange={value => {
          setMin(value[0] + "");
          setMax(value[1] + "");
          console.log("Value", value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 12,
  },
});
