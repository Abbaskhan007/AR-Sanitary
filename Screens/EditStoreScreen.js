import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { connect } from "react-redux";
import Header from "../Components/Header";
import LoadingScreen from "./LoadingScreen";
import MultiSelect from "react-native-multiple-select";
import Axios from "axios";

import * as ImagePicker from "expo-image-picker";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import constants from "../assets/constants";
import {
  FETCH_SELLER_DATA,
  STORE_FETCH_FAILURE,
  STORE_FETCH_REQUEST,
  STORE_FETCH_SUCCESS,
} from "../Redux/Constants";
import ErrorBox from "../Components/ErrorBox";

function EditStoreScreen({
  route,
  categories,
  navigation,
  fetchStoreData,
  fetchSellerData,
}) {
  const store = route.params;

  const [name, setName] = useState(store.name);
  const [description, setDescription] = useState(store.description);
  const [image, setImage] = useState(store.image);

  const [category, setCategory] = useState(categories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState(store.category);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSave = async () => {
    setLoading(true);
    setError(null);
    console.log(!name, !description, !items.length > 0, !image);
    if (!name || !description || !items.length > 0 || !image) {
      setError("Please Fill all the fields");
      Alert.alert("Please Enter all the fields");
    } else {
      try {
        let imageData = {
          uri: image,
          type: `test/${image.split(".")[image.split(".").length - 1]}`,
          name: `test/${image.split(".")[image.split(".").length - 1]}`,
        };
        const form = new FormData();
        form.append("file", imageData);
        form.append("upload_preset", "sanitary");
        data.append("folder", "stores");

        const cloudinayResponse = await Axios.post(
          "https://api.cloudinary.com/v1_1/dlxyvl6sb/image/upload",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          }
        );
        const data = {
          ...store,
          name,
          description,
          category: items,
          image: cloudinayResponse.data.url,
        };
        const response = await Axios.put(
          `${constants.url}/stores/updateStore`,
          data
        );
        console.log("Response", response);
        if (response.status === 200) {
          Alert.alert("Store Updated Successfully");
          fetchStoreData();

          navigation.goBack();
        }
      } catch (err) {
        console.log("Error", err);
        setError(err.message);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.form}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {error && <ErrorBox message={error} />}
          <Text style={styles.heading}>Name</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter Name"
            onChangeText={setName}
            value={name}
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
          <Text style={[styles.heading, { marginBottom: 5 }]}>Categories</Text>
          <View style={{ width: "100%" }}>
            <MultiSelect
              items={[...categories]}
              uniqueKey="id"
              onSelectedItemsChange={setItems}
              selectedItems={items}
              selectText="Select Worker"
              searchInputPlaceholderText="Enter Worker Categories"
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{
                color: "gray",
                fontSize: 15,
                fontWeight: "500",
              }}
              hideSubmitButton
              tagTextColor="gray"
              styleDropdownMenuSubsection={{
                flex: 1,
                height: 52,
                borderTopWidth: 1,
                borderColor: "#d1d5db",
                borderBottomWidth: 0,
              }}
              styleInputGroup={{
                padding: 6,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
              styleDropdownMenu={{
                paddingHorizontal: 12,
                borderRadius: 8,
                height: 50,
              }}
              styleMainWrapper={{
                backgroundColor: "#fff",
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#d1d5db",
              }}
              tagContainerStyle={{
                backgroundColor: "#fff",
              }}
            />
          </View>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.cameraIconContainer}
          >
            <Ionicons name="camera-outline" size={64} color="#d4d4d4" />
          </TouchableOpacity>
          {image ? (
            <Image style={styles.image} source={{ uri: image }} />
          ) : null}
          <View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16
  },
  form: {
    width: "90%",

    justifyContent: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 21,
    fontWeight: "400",
    marginBottom: 24,
    textAlign: "center",
  },
  heading: {
    textAlign: "left",
    fontSize: 20,
    alignSelf: "flex-start",
    fontWeight: "600",
    color: "#141212",
    marginBottom: 2,
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
    marginVertical: 12,
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
});
const mapStateToProps = state => {
  const categories = state.categories.map(ctg => {
    return {
      id: ctg.label,
      name: ctg.name,
    };
  });
  return {
    categories,
    seller: state.seller._id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSellerData: async user => {
      try {
        const response = await Axios.get(
          `${constants.url}/seller/getSeller/${user}`
        );
        console.log("Response", response.data);
        dispatch({ type: FETCH_SELLER_DATA, payload: response.data });
      } catch (err) {
        alert(err.message);
      }
    },
    fetchStoreData: async () => {
      dispatch({ type: STORE_FETCH_REQUEST });

      try {
        const { data } = await Axios.get(`${constants.url}/stores/getStores`);
        dispatch({
          type: STORE_FETCH_SUCCESS,
          payload: data,
        });
      } catch (err) {
        dispatch({ type: STORE_FETCH_FAILURE, payload: err.message });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStoreScreen);
