import {
  View,
  Text,
  Modal,
  StyleSheet,
 
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { connect } from "react-redux";
import Slider from "./Slider";
import constants from "../assets/constants";
import {
  WORKER_FETCH_FAILURE,
  WORKER_FETCH_SUCCESS,
} from "../Redux/Constants";
import Axios from "axios";

function WorkerFilter({
  categories,
  setModalVisible,
  isModalVisible,
  city,
  setCity,
  filterWorkers,
  minimum,
  setMinimum,
  maximum,
  setMaximum,
}) {
 

  const MAX = 5000;
  const MIN = 1;

  const maxChange = value => {
    if (!value) {
      setMaximum(1);
    } else if (parseInt(value) <= minimum) {
    } else {
      setMaximum(value);
    }
  };

  const minChange = value => {
    if (!value) {
      setMinimum(1);
      return;
    } else if (parseInt(value) >= maximum) {
      return;
    } else {
      setMinimum(value);
    }
  };

  const submitHandler = () => {
    const filterData = {
      min: minimum,
      max: maximum,
      categories,
      city,
    };
    filterWorkers(filterData);
    setModalVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View style={styles.ModelContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ backgroundColor: "transparent", flex: 1 }}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.container}>
          <Text style={styles.categoryTitle}>City</Text>
          <TextInput
            style={styles.textField}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
          <Text style={styles.categoryTitle}>Price</Text>
          <Slider
            max={maximum}
            min={minimum}
            setMin={setMinimum}
            setMax={setMaximum}
            MAX={MAX}
            MIN={MIN}
          />
          <View style={styles.inputRow}>
            <TextInput
              value={minimum}
              onChangeText={minChange}
              style={styles.input}
            />
            <TextInput
              value={maximum}
              onChangeText={maxChange}
              style={styles.input}
            />
          </View>
          <TouchableOpacity onPress={submitHandler} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = state => {
  return {
    //categories: state.workerCategories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkerFilter);

const styles = StyleSheet.create({
  ModelContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    backgroundColor: "#fff",
    padding: 22,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 18,
  },
  inputRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "47%",
    borderWidth: 2,
    borderColor: "#d4d4d4",
    padding: 9,
    fontSize: 16,
    borderRadius: 8,
    fontWeight: "500",
  },
  filterButton: {
    backgroundColor: "#818cf8",
    padding: 13,
    borderRadius: 12,
    marginVertical: 16,
  },
  filterButtonText: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "#fff",
  },
  textField: {
    borderColor: "#d4d4d4",
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: "500",
    color: "gray",
  },
});
