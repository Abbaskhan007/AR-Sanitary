import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import LoadingIndicator from "./LoadingIndicator";
import MultiSelect from "react-native-multiple-select";
import * as ImagePicker from "expo-image-picker";
import constants from "../assets/constants";
import Axios from "axios";

function CreateStoreForm({
  seller,
  categories,
  isModalVisible,
  setModalVisible,
}) {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

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

  const onSubmit = async () => {
    setLoading(true);
    if (!name || !category || !description || !image) {
      setError("Please Enter all the fields");
    } else {
      let imageData = {
        uri: image,
        type: `test/${image.split(".")[image.split(".").length - 1]}`,
        name: `test/${image.split(".")[image.split(".").length - 1]}`,
      };

      const data = new FormData();
      data.append("file", imageData);
      data.append("upload_preset", "sanitary");
      data.append("folder", "stores");

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
      const selectedItem = items.map(item => item.label);
      console.log("Selected Items", selectedItem);
      const storeData = {
        name,
        category: items,
        image: response.data.url,
        seller,
        description,
      };
      console.log("store dar", storeData)

      try {
        const response = await Axios.post(
          `${constants.url}/stores/createStore`,
          storeData
        );
        console.log("Store Creating Response", response);
        Alert.alert("Store Created Successfully");
        setModalVisible(false);
        navigation.navigate("Seller Dashboard");
      } catch (err) {
        console.log("Error", err);
        Alert.alert(`Store not created: ${err}`);
      }
    }
    setLoading(false);
  };

  console.log("Ite,", items)

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.iconStyle}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
            {loading ? (
              <View style={{ height: 550 }}>
                <LoadingIndicator loading={loading} />
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
              >
                <Text style={styles.title}>Create Store</Text>
                <Text style={styles.heading}>Name</Text>
                <TextInput
                  style={styles.textField}
                  placeholder="Enter Name"
                  onChangeText={setName}
                  value={name}
                />

                <Text style={styles.heading}>Description</Text>
                <TextInput
                  style={[
                    styles.textField,
                    { textAlignVertical: "top", height: 70 },
                  ]}
                  placeholder="Enter Description"
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={3}
                />
                <Text style={[styles.heading, { marginBottom: 5 }]}>
                  Categories
                </Text>
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
                    <TouchableOpacity
                      onPress={onSubmit}
                      style={styles.submitButton}
                    >
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(8,8,8, 0.4)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    maxHeight: 550,
  },
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

export default connect(mapStateToProps)(CreateStoreForm);
