import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  STORE_FETCH_FAILURE,
  STORE_FETCH_REQUEST,
  STORE_FETCH_SUCCESS,
} from "../Redux/Constants";
import constants from "../assets/constants";
import axios from "axios";
import { connect } from "react-redux";
import StoreCard from "../Components/StoreCard";
import StoreCategories from "../Components/StoreCategories";
import { AntDesign } from "@expo/vector-icons";
import SearchBar from "../Components/SearchBar";
import BottomSpace from "../Components/BottomSpace";

function StoreScreen({ fetchStoreData, store, filterStore }) {
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");

  const onSearch = value => {
    setSearch(value);
    filterStore({ search: value, categories: category });
  };

  const onCategoryChange = e => {
    const categories = e.map(item => item.value);
    setCategory(categories);
    filterStore({ categories, search });
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <SearchBar
          showFilterIcon={false}
          search={search}
          setSearch={onSearch}
          placeholder="Search Store"
        />
      </View>
      <StoreCategories search={search} />
      {store.data.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={store.data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <StoreCard item={item} />}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
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
            No Store Present
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.bgColor,
    padding: 24,
    paddingTop: constants.paddingTop,
  },
  seperator: {
    height: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 22,
  },
});

const mapStateToProps = state => {
  return {
    store: state.store,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStoreData: async () => {
      dispatch({ type: STORE_FETCH_REQUEST });

      try {
        const { data } = await axios.get(`${constants.url}/stores/getStores`);
        dispatch({
          type: STORE_FETCH_SUCCESS,
          payload: data,
        });
      } catch (err) {
        dispatch({ type: STORE_FETCH_FAILURE, payload: err.message });
      }
    },
    filterStore: async filterData => {
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
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen);
