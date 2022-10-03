import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function SplashScreen() {
  return (
    <View style={styles.conatiner}>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.imageContainer}>
        <View style={styles.circle1}></View>
        <View style={styles.circle2}></View>
        <Image
          style={styles.image}
          source={{
            uri: "https://res.cloudinary.com/dlxyvl6sb/image/upload/v1658953402/286-2868832_modern-chair-png-transparent-background-png-download-removebg-preview_bhxzil.png",
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.welcomeText}>Welcome to Sanitary Store</Text>
        <Text style={styles.description}>
          The best and easiest way to find and buy sanitary products with
          functionality of AR and Blockchain
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#fff",
  },
  circle1: {
    backgroundColor: "#A95EFA",
    width: 700,
    height: 700,
    position: "absolute",
    borderRadius: 400,
    top: -280,
    right: -320,
  },
  circle2: {
    backgroundColor: "#DABDFB",
    width: 250,
    height: 250,
    position: "absolute",
    borderRadius: 200,
    top: 300,
    left: -120,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginTop: 160,
  },
  imageContainer: {
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  bottomContainer: {
    padding: 32,
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
  },
  description: {
    textAlign: "center",
    color: "#858585",
    fontWeight: "500",
    marginBottom: 26,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#A95EFA",
    padding: 15,
    borderRadius: 25,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
