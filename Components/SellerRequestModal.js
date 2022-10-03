import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";
import { connect } from "react-redux";
import Axios from "axios";
import constants from "../assets/constants";

function SellerRequestModal({
  modalVisible,
  setModalVisible,
  user,
  productCategories
}) {
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  //const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  console.log(modalVisible);

  console.log("Items", items);

  const onSubmit = async () => {
    if (items.length < 1 || !description) {
      Alert.alert("Please Fill all the fields");
      return;
    }
    const data = { categories: items, description, user: user._id };
    console.log("Data", data);
    try {
      const response = await Axios.post(
        `${constants.url}/sellerRequests/sendSellerRequest`,
        data
      );
      console.log("Response", response.status);
      if (response.status === 200) {
        Alert.alert("Seller Request Sent successfully");
        setDescription("");
        setItems([]);
        setModalVisible(false);
      }
    } catch (err) {
      Alert.alert(err.response.data.message || err.message);
    }
  };

  const onCancel = () => {
    setModalVisible(close);
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
            <Text style={styles.title}>Seller Request</Text>
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
            <View style={{ width: "100%" }}>
              <MultiSelect
                items={productCategories}
                uniqueKey="id"
                //  ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={setItems}
                selectedItems={items}
                selectText="Select Worker"
                searchInputPlaceholderText="Enter Seller Categories"
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
          </View>
        </View>
      </Modal>
    </View>
  );
}

const mapStateToProps = state => {
  const productCategories = state.categories.map(ctg => {
    return { id: ctg.label, name: ctg.name };
  });
  return {
    worker: state.worker,
    user: state.user.user,
    productCategories
  };
};

export default connect(mapStateToProps)(SellerRequestModal);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(8,8,8, 0.4)",
  },
  modalView: {
    margin: 20,
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
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 22,
  },
  iconStyle: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(8,8,8, 0.5)",
    padding: 6,
    borderRadius: 22,
  },
  textField: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "400",
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
});
