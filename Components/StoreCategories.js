import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { STORE_FETCH_SUCCESS } from "../Redux/Constants";
import CategoryBox from "./CategoryBox";
import { useEffect } from "react/cjs/react.development";
import constants from "../assets/constants";

function StoreCategories({ categories, filterStore, search }) {
  const [activeCategories, setActiveCategories] = useState([
    { label: "All", name: "All" },
    ...categories,
  ]);

  //   const onSearch = value => {
  //     setSearch(value);
  //     filterStore({ search: value, categories: category });
  //   };

  //   const onCategoryChange = e => {
  //     const categories = e.map(item => item.value);
  //     setCategory(categories);
  //   };
  useEffect(() => {
    const categoryLabels = activeCategories
      .map(ctg => ctg.label)
      .filter(ctg => ctg !== "All");
    filterStore({ categories: categoryLabels, search });
  }, [activeCategories]);
  return (
    <View style={styles.container}>
      <FlatList
        data={[{ name: "All", label: "All" }, ...categories]}
        keyExtractor={item => item.label}
        horizontal
        renderItem={({ item }) => (
          <CategoryBox
            color="white"
            activeCategories={activeCategories}
            setActiveCategories={setActiveCategories}
            active
            item={item}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    marginTop: -4,
  },
});

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filterStore: async filterData => {
      try {
        console.log("********** Filtered Data", filterData);
        const { data } = await axios.post(
          `${constants.url}/stores/filterStore`,
          filterData
        );
        console.log("Data of stores -----", data);
        dispatch({
          type: STORE_FETCH_SUCCESS,
          payload: data,
        });
      } catch (err) {
        console.log("Error-------------", err);
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreCategories);
