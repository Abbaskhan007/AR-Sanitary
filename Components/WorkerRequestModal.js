import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";
import { connect } from "react-redux";
import Axios from "axios";
import constants from "../assets/constants";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import LoadingIndicator from "./LoadingIndicator";

function WorkerRequestModal({
  modalVisible,
  setModalVisible,
  categories,
  user,
}) {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

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
      data.append("workers", "products");

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

      setImages([...images, response.data.url]);

      setLoading(false);
    }
  };

  const onSubmit = async () => {
    if (items.length < 1 || !description || !city || !price) {
      Alert.alert("Please Fill all the fields");
      return;
    }
    setLoading(false);
    const data = {
      categories: items,
      description,
      price,
      city,
      user: user._id,
      images,
    };

    console.log("Data", data);
    try {
      const response = await Axios.post(
        `${constants.url}/workerRequests/sendWorkerRequest`,
        data
      );
      console.log("Response", response.status);
      if (response.status === 200) {
        Alert.alert("Worker Request Sent successfully");
        setDescription(null);
        setItems([]);
        setPrice(null);
        setCity(null);
        setModalVisible(false);
      }
    } catch (err) {
      Alert.alert(err.response.data.message || err.message);
    }
  };

  const onCancel = () => {
    setModalVisible(close);
  };

  const onDeleteIcon = item => {
    console.log("Images", item, images);
    const updatedImages = images.filter(img => img !== item);
    // console.log("Item", item, updatedImages);
    setImages(updatedImages);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
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
                <Text style={styles.title}>Worker Request</Text>
                <Text style={styles.heading}>City</Text>
                <TextInput
                  style={styles.textField}
                  placeholder="Enter City"
                  value={city}
                  onChangeText={setCity}
                />
                <Text style={styles.heading}>Price</Text>
                <TextInput
                  style={[
                    styles.textField,
                    { width: 150, alignSelf: "flex-start" },
                  ]}
                  placeholder="Enter price"
                  value={price}
                  onChangeText={setPrice}
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
                    //  ref={(component) => { this.multiSelect = component }}
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
                <View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={images}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                      <View style={styles.workImageContainer}>
                        <TouchableOpacity
                          onPress={() => onDeleteIcon(item)}
                          style={styles.delteIcon}
                        >
                          <AntDesign name="close" size={16} color="white" />
                        </TouchableOpacity>
                        <Image style={styles.image} source={{ uri: item }} />
                      </View>
                    )}
                  />
                </View>
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

const mapStateToProps = state => {
  const categories = state.workerCategories.map(ctg => {
    return {
      id: ctg.label,
      name: ctg.name,
    };
  });
  return {
    worker: state.worker,
    categories,
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(WorkerRequestModal);

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

/* 
 <ScrollView contentContainerStyle={styles.centeredView}>
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={styles.modalView}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.iconStyle}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Worker Request</Text>
            <Text style={styles.heading}>City</Text>
            <TextInput
              style={styles.textField}
              placeholder="Enter City"
              value={city}
              onChangeText={setCity}
            />
            <Text style={styles.heading}>Price</Text>
            <TextInput
              style={[
                styles.textField,
                { width: 150, alignSelf: "flex-start" },
              ]}
              placeholder="Enter price"
              value={price}
              onChangeText={price}
            />
            <Text style={styles.heading}>Description</Text>
            <TextInput
              style={[styles.textField, { textAlignVertical: "top" }]}
              placeholder="Enter Description"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={3}
            />
            <Text style={[styles.heading, { marginBottom: 10 }]}>
              Categories
            </Text>
            <View style={{ width: "100%" }}>
              <MultiSelect
                items={[...categories]}
                uniqueKey="id"
                //  ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={setItems}
                selectedItems={items}
                selectText="Select Worker"
                searchInputPlaceholderText="Enter Worker Categories"
                onChangeInput={text => console.log(text)}
                altFontFamily="ProximaNova-Light"
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
                  borderColor: "gray",
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
                  borderColor: "gray",
                }}
                tagContainerStyle={{
                  backgroundColor: "#fff",
                }}
              />
            </View>

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
        </ScrollView>
        */
