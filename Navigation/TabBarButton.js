import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useRef, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

function TabButton(props) {
  const navigation = useNavigation();
  const { tab, onPress, cart } = props;
  const Type = tab.type;
  const focused = props.accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  const circleFocused = {
    0: { scale: 0 },
    0.3: { scale: 0.9 },
    0.5: { scale: 0.3 },
    0.8: { scale: 0.7 },
    1: { scale: 1 },
  };

  const circleUnFocused = {
    0: { scale: 1 },
    1: { scale: 0 },
  };

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, translateY: 8 },
        1: { scale: 1.2, translateY: -20 },
      });
      circleRef.current.animate(circleFocused);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate({
        0: { scale: 1.2, translateY: -20 },
        0.92: { translateY: -34 },
        1: { scale: 1, translateY: 8 },
      });
      circleRef.current.animate(circleUnFocused);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <View style={styles.conatiner}>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Animatable.View ref={viewRef} duration={1000}>
          <View style={styles.btn}>
            <Animatable.View
              ref={circleRef}
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "#637aff",
                borderRadius: 25,
              }}
            />

            {tab.label === "Cart" && cart.length >= 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cart.length}</Text>
              </View>
            )}

            <Type
              size={focused ? 24 : 30}
              name={tab.inActiveIcon}
              color={focused ? "#fff" : "#637aff"}
            />
          </View>
          <Animatable.Text
            style={{
              fontSize: 12,
              textAlign: "center",
            }}
            ref={textRef}
          >
            {tab.label}
          </Animatable.Text>
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(TabButton);

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? 0 : 22,
  },
  btn: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "#fff",
  },
  badge: {
    position: "absolute",
    backgroundColor: "red",

    width: 24,
    height: 24,
    borderRadius: 13,
    top: -16,
    right: -12,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
