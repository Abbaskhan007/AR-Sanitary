import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Header from "../Components/Header";
import constants from "../assets/constants";
import { connect } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";

import Axios from "axios";

import * as ImagePicker from "expo-image-picker";
import {
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_REQUEST_FAIL,
  PRODUCT_FETCH_REQUEST_SUCCESS,
} from "../Redux/Constants";

function EditProductScreen({
  route,
  navigation,
  fetchProducts,
  productCategories,
}) {
  const product = route.params;
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price + "");
  const [inStock, setInStock] = useState(product.inStock + "");
  const [images, setImages] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(
    product.shippingPrice + ""
  );
  const [categories, setCategories] = useState(productCategories);
  const [cloudinaryImages, setCloudinaryImage] = useState([...product.images]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [items, setItems] = useState(product.category);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const onDeleteIcon = item => {
    console.log("Images", item, images, cloudinaryImages);
    const updatedImages = images.filter(img => img !== item);
    const updatedCloudinaryImages = cloudinaryImages.filter(
      img => img.url !== item.url
    );
    setImages(updatedImages);
    setCloudinaryImage(updatedCloudinaryImages);
  };

  console.log("Items:", items);

  const onSave = async () => {
    setLoading(true);
    setError(null);
    if (
      (images.length === 0 && cloudinaryImages.length === 0) ||
      !description ||
      !items ||
      !price ||
      !inStock ||
      !name ||
      !shippingPrice ||
      !model
    ) {
      alert("Please Fill All Input Fields");
      setError("Please Fill All Input Fields");
    } else {
      try {
        const addedImages = await Promise.all(
          images.map(async image => {
            let imageData = {
              uri: image,
              type: `test/${image.split(".")[image.split(".").length - 1]}`,
              name: `test/${image.split(".")[image.split(".").length - 1]}`,
            };
            console.log("____________________________", imageData);
            const data = new FormData();
            data.append("file", imageData);
            data.append("upload_preset", "sanitary");
            data.append("cloud_name", "dlxyvl6sb");
            data.append("folder", "products");

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
            return {
              url: response.data.url,
              public_id: response.data.public_id,
            };
          })
        );

        console.log("Added Images", addedImages);

        const data = {
          name,
          images: [...cloudinaryImages, ...addedImages],
          description,
          price,
          inStock,
          shippingPrice,
          category: items,
          model,
        };
        try {
          const response = await Axios.put(
            `${constants.url}/products/updateProduct/${product._id}`,
            data
          );
          console.log("response*********************** (4)", response);
          if (response.status === 200) {
            fetchProducts();
            navigation.goBack();
            Alert.alert("Product Updated Successfully");
          }
        } catch (err) {
          console.log("Error 1", err);
          Alert.alert(`Product not updated successfully: ${err}`);
        }
      } catch (err) {
        console.log("2....", err.message);
      }
    }

    setLoading(false);
  };

  console.log("+================+", [...images, ...cloudinaryImages]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.form}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <Text style={styles.heading}>Name</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter Name"
            onChangeText={setName}
            value={name}
          />

          <Text style={styles.heading}>Price</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter Price"
            onChangeText={setPrice}
            value={price}
          />

          <Text style={styles.heading}>InStock</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter InStock Items"
            onChangeText={setInStock}
            value={inStock}
          />

          <Text style={styles.heading}>Shipping Price</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter Shipping Price"
            onChangeText={setShippingPrice}
            value={shippingPrice}
          />

          <Text style={styles.heading}>Description</Text>
          <TextInput
            style={[styles.textField, { textAlignVertical: "top", height: 70 }]}
            placeholder="Enter Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={3}
          />
          <Text style={styles.heading}>3D Model</Text>
          <TextInput
            style={[styles.textField, { textAlignVertical: "top", height: 70 }]}
            placeholder="Enter 3D Model Url (.glb)"
            value={model}
            onChangeText={setModel}
          />
          <Text style={[styles.heading, { marginBottom: 5 }]}>Categories</Text>
          {Platform.OS === "android" ? (
            <Picker
              selectedValue={items}
              onValueChange={value => setItems(value)}
              style={{ backgroundColor: "#e5e7eb", marginTop: 8 }}
              mode="dropdown"
            >
              {productCategories.map(ctg => (
                <Picker.Item label={ctg.label} value={ctg.value} />
              ))}
            </Picker>
          ) : (
            <View style={{ width: "100%" }}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                onValueChange={value => setItems(value)}
                items={productCategories}
                placeholder={{ label: "Select Product Category", value: null }}
                value={items}
                Icon={() => <AntDesign name="down" size={16} color="black" />}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 15,
                    right: 12,
                  },
                }}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={pickImage}
            style={styles.cameraIconContainer}
          >
            <Ionicons name="camera-outline" size={64} color="#d4d4d4" />
          </TouchableOpacity>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[...images, ...cloudinaryImages]}
              keyExtractor={(item, index) => index}
              renderItem={({ item }) => (
                <View style={styles.workImageContainer}>
                  <TouchableOpacity
                    onPress={() => onDeleteIcon(item)}
                    style={styles.delteIcon}
                  >
                    <AntDesign name="close" size={16} color="white" />
                  </TouchableOpacity>
                  <Image
                    style={styles.image}
                    source={{ uri: item.url ? item.url : item }}
                  />
                </View>
              )}
            />
          </View>
          <View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.buttonText}>Discard</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onSave} style={styles.submitButton}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  const productCategories = state.categories.map(ctg => {
    return { label: ctg.label, value: ctg.name };
  });
  return {
    productCategories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: async () => {
      dispatch({ type: PRODUCT_FETCH_REQUEST });
      try {
        const { data } = await Axios.get(
          `${constants.url}/products/getProducts`
        );

        dispatch({
          type: PRODUCT_FETCH_REQUEST_SUCCESS,
          payload: data,
        });
      } catch (err) {
        console.log("Error Message", err.message);
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 32,
  },
  form: { width: "90%", marginTop: 32 },
  title: {
    fontSize: 21,
    fontWeight: "400",
    marginBottom: 24,
    textAlign: "center",
  },
  heading: {
    textAlign: "left",
    fontSize: 18,
    alignSelf: "flex-start",
    fontWeight: "500",
    color: "#141212",
  },
  iconStyle: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(8,8,8, 0.5)",
    padding: 6,
    borderRadius: 22,
    zIndex: 50,
  },
  delteIcon: {
    position: "absolute",
    top: 4,
    right: 17,
    backgroundColor: "rgba(8,8,8, 0.5)",
    padding: 4,
    borderRadius: 22,
    zIndex: 50,
  },
  textField: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#d1d5db",
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "400",
    paddingHorizontal: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 18,
    marginBottom: 58,
  },
  cancelButton: {
    backgroundColor: "#EF4444",
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#22C55E",
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cameraIconContainer: {
    borderWidth: 3,
    borderColor: "#d4d4d4",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 32,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 14,
  },
  workImageContainer: {
    position: "relative",
  },
  delteIcon: {
    position: "absolute",
    top: 4,
    right: 17,
    backgroundColor: "rgba(8,8,8, 0.5)",
    padding: 4,
    borderRadius: 22,
    zIndex: 50,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductScreen);
