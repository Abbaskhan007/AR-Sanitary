import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";
import { connect } from "react-redux";
import { PRODUCT_SEARCH } from "../Redux/Constants";
import constants from "../assets/constants";
import mime from "mime";

function ImageSearch({ fetchProducts }) {
  const URL_FLASK =
    Platform.OS === "android" ? "http://192.168.0.117" : "http://127.0.0.1";
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const newImageUri = "file:///" + result.uri.split("file:/").join("");
      console.log("-------==", result.uri, "--------", newImageUri);
      const formData = new FormData();
      formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop(),
      });
      // let imageData = {
      //   uri: result.uri,
      //   type: `image/jpg`,
      //   name: `test.jpg`,
      // };
      //console.log("ImageData----", imageData);
      try {
        // const data = new FormData();
        // data.append("file", imageData);
        console.log("________________________ form Data:", formData);
        const response = await Axios.post(
          `${URL_FLASK}:4000/flaskSearchImage`,
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept": "application/json",
            },
          }
        );

        console.log("Response ------", response.data);
        const public_ids = Object.values(response.data).map(
          item => `products/${item.split("/")[1].split(".")[0]}`
        );
        console.log("Public Ids", public_ids);
        const productData = await Axios.post(
          `${constants.url}/products/imageSearch`,
          public_ids
        );

        console.log("Product Data after image search: ", productData.data);
        fetchProducts(productData.data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };

 

  return (
    <View style={{ marginLeft: 15 }}>
      <TouchableOpacity onPress={pickImage}>
        <AntDesign name="camerao" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: async data => {
      dispatch({
        type: PRODUCT_SEARCH,
        payload: data,
      });
    },
  };
};

//  ImageSearch;
export default connect(null, mapDispatchToProps)(ImageSearch);
