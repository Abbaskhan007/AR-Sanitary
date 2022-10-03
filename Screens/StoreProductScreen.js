import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CategoryBox from "../Components/CategoryBox";
import ProductCard from "../Components/ProductCard";
import constants from "../assets/constants";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import AddProductForm from "../Components/AddProductForm";

function StoreProductScreen({ store, categories, seller, user }) {
  // const [category, setCategory] = useState("All");
  const [activeCategories, setActiveCategories] = useState([
    { label: "All", name: "All" },
    ...categories,
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState(store?.products);

  // useEffect(() => {
  //   if (category === "All") {
  //     setProducts(store.products);
  //   } else {
  //     const filteredData = store.products.filter(
  //       product => product.category[0] === category
  //     );
  //     setProducts(filteredData);
  //   }
  // }, [categories]);

  useEffect(() => {}, [isModalVisible]);

  return (
    <View style={styles.container}>
      {/* <FlatList
        contentContainerStyle={{ marginBottom: 22 }}
        data={["All", ...store.category]}
        keyExtractor={item => item}
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
      /> */}
      {store.seller._id === seller._id && (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}
        >
          <Ionicons name="md-create-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      )}
      {isModalVisible && (
        <AddProductForm
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          storeId={store._id}
        />
      )}
      {products.length > 0 ? (
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.seperator}></View>}
          renderItem={({ item, index }) => <ProductCard item={item} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>No Products Present</Text>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    seller: state.seller,
    user: state.user.user._id,
  };
};

export default connect(mapStateToProps)(StoreProductScreen);

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 24 },
  seperator: {
    width: 16,
    height: 16,
  },
  button: {
    backgroundColor: "#818cf8",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 5,
  },
  emptyContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "auto",
    marginTop: "40%",
  },
  empty: {
    fontSize: 22,
    fontWeight: "500",
    color: "gray",
  },
});
