import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import constants from "../assets/constants";
import {
  LOADING_FALSE,
  LOADING_TRUE,
  UPDATE_PROFILE,
} from "../Redux/Constants";
import ErrorBox from "../Components/ErrorBox";
import LoadingScreen from "./LoadingScreen";
import Header from "../Components/Header";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../Components/BackButton";

function EditProfileScreen({ user, updateProfile }) {
  console.log("User_______________", user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(user.address);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber?user.phoneNumber+"":"");
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    console.log("---------");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("--------- -0-0", result);

    if (!result.cancelled) {
      setLoading(true);
      let imageData = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[result.uri.split(".").length - 1]}`,
        name: `test/${result.uri.split(".")[result.uri.split(".").length - 1]}`,
      };

      const data = new FormData();
      data.append("file", imageData);
      data.append("upload_preset", "sanitary");
      data.append("folder", "users");

      const response = await Axios.post(
        "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      setProfileImage(response.data.url);

      setLoading(false);
    }
  };

  const onSubmit = () => {
    setErrorMsg(null);

    if (!password) {
      updateProfile(
        {
          _id: user._id,
          name,
          email,
          phoneNumber,
          profileImage,
          address,
        },
        setErrorMsg
      );
    } else {
      if (newPassword !== confirmPassword) {
        setErrorMsg("New Password is not equal to Confirm New Password");
      } else if (newPassword.length < 6 || confirmPassword.length < 6) {
        setErrorMsg("New Password is not equal to Confirm New Password");
      } else {
        setLoading(true);
        updateProfile(
          {
            _id: user._id,
            name,
            email,
            phoneNumber,
            profileImage,
            address,
            password: password,
            hashPassword: user.password,
            newPassword,
          },
          setErrorMsg
        );
        setLoading(false);
      }
    }
  };

  console.log("Profile", profileImage);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.form}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: profileImage }} />

          <FontAwesome
            onPress={pickImage}
            style={styles.iconStyle}
            name="pencil"
            size={24}
            color="black"
          />
        </View>
        {errorMsg && <ErrorBox message={errorMsg} />}

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
          style={styles.inputField}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          style={styles.inputField}
        />

        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter Phone Number"
          style={styles.inputField}
        />
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
          style={styles.inputField}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          style={styles.inputField}
          secureTextEntry={true}
        />
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
          placeholder="Enter New Password"
          style={styles.inputField}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          placeholder="Confirm Password"
          style={styles.inputField}
        />

        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "75%",
    alignSelf: "center",
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 24,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  iconStyle: {
    position: "absolute",
    right: 40,
    bottom: 15,
    color: "#fff",
  },
  inputField: {
    borderColor: "#d4d4d4",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 17,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#818cf8",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 32,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: async (userData, setErrorMsg) => {
      const { data } = await Axios.post(
        `${constants.url}/users/updateProfile`,
        userData
      );
      console.log("Updated user profile data", data);
      if (data.message) {
        setErrorMsg(data.message);
      } else {
        Alert.alert("Profile Updated");
        dispatch({
          type: UPDATE_PROFILE,
          payload: data,
        });
      }
    },
    trueLoading: () => {
      dispatch({
        type: LOADING_TRUE,
      });
    },
    falseLoading: () => {
      dispatch({
        type: LOADING_FALSE,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
