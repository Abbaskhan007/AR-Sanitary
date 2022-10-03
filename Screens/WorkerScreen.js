import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import constants from "../assets/constants";
import MultiSelect from "react-native-multiple-select";
import {
  WORKER_FETCH_FAILURE,
  WORKER_FETCH_REQUEST,
  WORKER_FETCH_SUCCESS,
} from "../Redux/Constants";
import Axios from "axios";
import WorkerCard from "../Components/WorkerCard";
import SearchBar from "../Components/SearchBar";
import { AntDesign } from "@expo/vector-icons";
import WorkerFilter from "../Components/WorkerFilter";
import workerDropDown from "../Components/workerDropDown";
import BottomSpace from "../Components/BottomSpace";

function WorkerScreen({ categories, worker, fetchWorkers, filterWorkers }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [city, setCity] = useState("");
  const [items, setItems] = useState([]);

  const [minimum, setMinimum] = useState("1");
  const [maximum, setMaximum] = useState("5000");

  console.log("Items___________", items);

  const onChangeItem = value => {
    console.log("Value", value);
    setItems(value);
    const filterData = {
      min: minimum,
      max: maximum,
      categories: value,
      city,
    };
    filterWorkers(filterData);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={{ flex: 1 }}>
          <MultiSelect
            items={[...categories]}
            uniqueKey="id"
            //  ref={(component) => { this.multiSelect = component }}
            onSelectedItemsChange={onChangeItem}
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
            searchInputStyle={{}}
            styleDropdownMenuSubsection={{ flex: 1, height: 52 }}
            styleInputGroup={{
              padding: 8,
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
            }}
            tagContainerStyle={{
              backgroundColor: "#fff",
            }}
          />
        </View>
        <AntDesign
          onPress={() => setModalVisible(!isModalVisible)}
          name="filter"
          size={32}
          color="black"
          style={{ marginLeft: 12 }}
        />
      </View>
      <WorkerFilter
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        categories={items}
        city={city}
        setCity={setCity}
        minimum={minimum}
        setMinimum={setMinimum}
        maximum={maximum}
        setMaximum={setMaximum}
      />

      {worker.data.length > 0 ? (
        <FlatList
          data={worker.data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <WorkerCard item={item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
          ListFooterComponent={<BottomSpace />}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "500", color: "#d946ef" }}>
            No Worker Present
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: constants.bgColor,
    paddingTop: constants.paddingTop,
  },

  seperator: {
    height: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 22,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 22,
    alignItems: "center",
  },
});

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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkers: async () => {
      console.log("Running");
      dispatch({ type: WORKER_FETCH_REQUEST });
      try {
        const { data } = await Axios.get(`${constants.url}/worker/getWorkers`);
        console.log("Workers Data --", data);
        dispatch({ type: WORKER_FETCH_SUCCESS, payload: data });
      } catch (err) {
        console.log(err);
        dispatch({ type: WORKER_FETCH_FAILURE, payload: err.message });
      }
    },
    filterWorkers: async filterData => {
      try {
        const { data } = await Axios.post(
          `${constants.url}/worker/filterWorkers`,
          filterData
        );
        console.log("Workers Data --", data);
        dispatch({ type: WORKER_FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: WORKER_FETCH_FAILURE, payload: err.message });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkerScreen);
