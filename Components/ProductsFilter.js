import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CategoryBox from "./CategoryBox";
import { connect } from "react-redux";
import Slider from "./Slider";
import constants from "../assets/constants";
import { PRODUCT_FETCH_REQUEST_FAIL, PRODUCT_SEARCH } from "../Redux/Constants";
import Axios from "axios";

function ProductsFilter({
  categories,
  setModalVisible,
  isModalVisible,
  keyword,
  filterProducts,
}) {
  const [activeCategories, setActiveCategories] = useState([
    { label: "All", name: "All" },
    ...categories,
  ]);

  const [minimum, setMinimum] = useState("1");
  const [maximum, setMaximum] = useState("50000");

  const MAX = 50000;
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
    const categories = activeCategories
      .map(ctg => ctg.label)
      .filter(ctg => ctg !== "All");
    console.log("Categories", categories);
    const filterData = {
      min: minimum,
      max: maximum,
      categories,
      keyword,
    };
    filterProducts(filterData);
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
          <Text style={styles.categoryTitle}>Categories</Text>
          <FlatList
            data={[{ name: "All", label: "All" }, ...categories]}
            keyExtractor={item => item.label}
            horizontal
            renderItem={({ item }) => (
              <CategoryBox
                activeCategories={activeCategories}
                setActiveCategories={setActiveCategories}
                item={item}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            showsHorizontalScrollIndicator={false}
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
    categories: state.categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterProducts: async data => {
      try {
        const filteredData = await Axios.post(
          `${constants.url}/products/filteredProducts`,
          data
        );
        console.log("Filtered Data------------", filteredData.data);
        dispatch({
          type: PRODUCT_SEARCH,
          payload: filteredData.data,
        });
      } catch (err) {
        console.log("Error message---------------", err);
        dispatch({
          type: PRODUCT_FETCH_REQUEST_FAIL,
          payload: err.message,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilter);

const styles = StyleSheet.create({
  ModelContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    backgroundColor: "#fff",
    padding: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "500",
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
    borderRadius: 10,
    marginTop: 22,
    marginBottom: 12
  },
  filterButtonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
    
  },
});
