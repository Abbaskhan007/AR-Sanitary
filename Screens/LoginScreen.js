import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { AntDesign, Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Axios from "axios";
import {
  ADD_TO_CART,
  EMPTY_CART,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  FETCH_SELLER_DATA,
} from "../Redux/Constants";
import constants from "../assets/constants";
import ErrorBox from "../Components/ErrorBox";
import BackButton from "../Components/BackButton";
import Header from "../Components/Header";

function LoginScreen({ navigation, route, loginAction, user, cart }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibile, setPasswordVisible] = useState(false);
  const [error, setError] = useState(user.error);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nav = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions(
      {
        tabBarStyle: {
          display: "none",
        },
      },
      [navigation, route]
    );
  });

  useLayoutEffect(() => {
    if (user.user.name) {
      navigation.replace("User Profile");
    }
  });

  const submitHandler = async e => {
    e.preventDefault();
    loginAction({ email, password }, cart, navigation);
  };

  useEffect(() => {
    setError(false);
  }, []);

  return (
    <KeyboardAwareScrollView
      keyboardVerticalOffset={500}
      automaticallyAdjustContentInsets={false}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardShouldPersistTaps="handled"
    >
      {/* <View style={{ marginTop: 32, zIndex: 8, marginHorizontal: 8 }}>
        <BackButton color="black" />
      </View> */}
      <View style={{marginTop: 12, zIndex: 50}}>
        <Header title="Login"/>
      </View>

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
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        {error && <ErrorBox message={error} />}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => emailRef.current.focus()}
          style={styles.fieldRow}
        >
          <AntDesign name="mail" size={24} color="gray" />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Your Email"
            value={email}
            onChangeText={setEmail}
            ref={emailRef}
            autoCapitalize="none"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => passwordRef.current.focus()}
          style={styles.fieldRow}
        >
          <AntDesign name="lock" size={26} color="gray" />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={passwordVisibile}
            ref={passwordRef}
            autoCapitalize="none"
          />
          <Feather
            onPress={e => {
              setPasswordVisible(!passwordVisibile);
            }}
            name={passwordVisibile ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={submitHandler} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.accountText}>
          <Text style={styles.question}>Don't Have an Account?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Registeration")}
          >
            <Text style={styles.option}>Registeration</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  circle1: {
    backgroundColor: "#A95EFA",
    width: 700,
    height: 700,
    position: "absolute",
    borderRadius: 400,
    top: -350,
    right: -330,
  },
  circle2: {
    backgroundColor: "#DABDFB",
    width: 250,
    height: 250,
    position: "absolute",
    borderRadius: 200,
    top: 190,
    left: -120,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginTop: 70,
  },
  imageContainer: {
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  form: {
    width: "85%",
    alignSelf: "center",
    paddingBottom: 50,
  },
  fieldRow: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 2,
    borderColor: "#d4d4d4",
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
  },
  inputField: {
    fontSize: 16,
    color: "gray",
    fontWeight: "500",
    flex: 1,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#A95EFA",
    padding: 12,
    borderRadius: 32,
    marginVertical: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 20,
  },
  accountText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  question: {
    fontSize: 16,
  },
  option: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
    color: "#A95EFA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },
});

const mapStateToProps = state => {
  console.log("State", state);
  return {
    user: state.user,
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAction: async (userData, cart, navigation) => {
      dispatch({
        type: LOGIN_REQUEST,
      });
      try {
        const { data } = await Axios.post(
          `${constants.url}/users/login`,
          userData
        );
        console.log("Data----", data);
        if (data.message) {
          dispatch({
            type: LOGIN_REQUEST_FAIL,
            payload: data.message,
          });
        } else if (data.user) {
          dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            payload: data.user,
          });
          if (data.user.isSeller) {
            try {
              const response = await Axios.get(
                `${constants.url}/seller/getSeller/${data.user._id}`
              );
              console.log("Response", response);
              dispatch({ type: FETCH_SELLER_DATA, payload: response.data });
              AsyncStorage.setItem("seller", JSON.stringify(response.data));
            } catch (err) {
              alert(err.message);
            }
          }
          console.log("User in________________", data.user);
          AsyncStorage.setItem("user", JSON.stringify(data.user));

          AsyncStorage.removeItem("cart");
          dispatch({ type: EMPTY_CART });

          await cart.forEach(async item => {
            console.log("Item", item);
            const cartData = await Axios.post(
              `${constants.url}/cart/addToCart`,
              {
                user: data.user._id,
                products: {
                  product: item.product._id,
                  quantity: item.quantity,
                },
              }
            );
            console.log("Data", data);
            dispatch({ type: ADD_TO_CART, payload: cartData.data.products });
          });
          navigation.goBack();
        }
      } catch (err) {
        dispatch({
          type: LOGIN_REQUEST_FAIL,
          payload: err?.message,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
