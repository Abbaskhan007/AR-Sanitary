import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

export default function LoadingScreen() {
  return (
    <LottieView source={require("../assets/loading.json")} autoPlay loop />
  );
}
