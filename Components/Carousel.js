import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";

export default function Carousel({ images }) {
  console.log("Images-----", images);
  const [active, setActive] = useState(0);

  const scrollX = new Animated.Value(0);

  const dotPosition = Animated.divide(
    scrollX,
    Dimensions.get("screen").width - 24
  );
  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        snapToAlignment="center"
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {images?.map((item, index) => {
          return (
            <View key={index} key={item.image} style={styles.container}>
              <Image style={styles.image} source={{ uri: item.url }} />
            </View>
          );
        })}
      </Animated.ScrollView>
      <View style={styles.dotRow}>
        {images?.map((item, num) => {
          const opacity = dotPosition.interpolate({
            inputRange: [num - 1, num, num + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const dotSize = dotPosition.interpolate({
            inputRange: [num - 1, num, num + 1],
            outputRange: [8, 17, 8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              opacity={opacity}
              style={[styles.inActiveDot, { width: dotSize }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width - 24,

    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  inActiveDot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: "#fff",
    marginHorizontal: 6,
  },

  dotRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    position: "absolute",
    bottom: 20,
    left: "44%",
  },
});
