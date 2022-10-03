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
} from "react-native";
import React, { useState, useRef, useLayoutEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Axios from "axios";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ADD_TO_CART,
  EMPTY_CART,
  REGISTERATION_REQUEST,
  REGISTERATION_REQUEST_FAIL,
  REGISTERATION_REQUEST_SUCCESS,
} from "../Redux/Constants";
import constants from "../assets/constants";
import ErrorBox from "../Components/ErrorBox";
import BackButton from "../Components/BackButton";
import Header from "../Components/Header";
function RegisterationScreen({
  navigation,
  route,
  registerAction,
  user,
  cart,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(user.error);

  const [passwordVisibile, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const confirmRef = useRef(null);

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
    setError(null);

    if (password.length < 6) {
      setError("Password should be atleast 6 character");
      return;
    } else if (password !== confirmPassword) {
      setError("Password is not equal to confirm password");
      return;
    } else {
      registerAction(
        { name: name, email: email, password, confirmPassword },
        cart,
        navigation
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardVerticalOffset={500}
      automaticallyAdjustContentInsets={false}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" />
      {/* <View
        style={{
          alignSelf: "flex-start",
          marginTop: 24,
          zIndex: 8,
          marginHorizontal: 8,
        }}
      >
        <BackButton bg="#fff" color="#000" />
      </View> */}

      <View style={{ marginTop: 12, zIndex: 50,  alignSelf: "flex-start", }}>
        <Header title="Registeration" />
      </View>

      <View style={styles.form}>
        <Text style={styles.title}>Registeration</Text>
        {error && <ErrorBox message={error} />}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => nameRef.current.focus()}
          style={styles.fieldRow}
        >
          <MaterialIcons name="person" size={24} color="gray" />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Your Name"
            value={name}
            onChangeText={setName}
            ref={nameRef}
          />
        </TouchableOpacity>
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
        <TouchableOpacity
          onPress={() => confirmRef.current.focus()}
          style={styles.fieldRow}
        >
          <AntDesign name="lock" size={26} color="gray" />
          <TextInput
            style={styles.inputField}
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={confirmVisible}
            ref={confirmRef}
            autoCapitalize="none"
          />
          <Feather
            onPress={e => {
              setConfirmVisible(!confirmVisible);
            }}
            name={confirmVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
        <Text style={styles.forgetPassword}>Forget Password?</Text>
        <TouchableOpacity onPress={submitHandler} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.accountText}>
          <Text style={styles.question}>Already Have an Account?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.option}>Login</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "85%",
    alignSelf: "center",
    paddingBottom: 50,
    flex: 1,
    justifyContent: "center",
  },
  fieldRow: {
    flexDirection: "row",

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
  forgetPassword: {
    fontSize: 16,
    color: "#b5b3ae",
    marginLeft: "auto",
    marginVertical: 5,
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
    registerAction: async (userData, cart, navigation) => {
      console.log("user data action", userData, "_______________", cart);
      dispatch({
        type: REGISTERATION_REQUEST,
      });
      try {
        const { data } = await Axios.post(
          `${constants.url}/users/registeration`,
          userData
        );
        console.log("Data----", data);
        if (data.message) {
          dispatch({
            type: REGISTERATION_REQUEST_FAIL,
            payload: data.message,
          });
        } else if (data.user) {
          dispatch({
            type: REGISTERATION_REQUEST_SUCCESS,
            payload: data.user,
          });

          AsyncStorage.setItem("user", JSON.stringify(data.user));

          //Pushing all local storage cart items in to the database

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
          navigation.navigate("Drawer");
        }
      } catch (err) {
        dispatch({
          type: REGISTERATION_REQUEST_FAIL,
          payload: err?.message,
        });
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterationScreen);
