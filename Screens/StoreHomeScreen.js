import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import StarRating from "../Components/StarRating";
import moment from "moment";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import constants from "../assets/constants";
import Axios from "axios";
import { connect } from "react-redux";
import {
  STORE_FETCH_FAILURE,
  STORE_FETCH_REQUEST,
  STORE_FETCH_SUCCESS,
} from "../Redux/Constants";
import { useNavigation } from "@react-navigation/native";
import ReviewBox from "../Components/ReviewBox";

function StoreHomeScreen({ store, fetchStoreData, seller }) {
  const [reviews, setReviews] = useState([]);
  const fetchReviews = async () => {
    const { data } = await Axios.post(`${constants.url}/orders/getReviews`, {
      storeId: store._id,
    });
    console.log("data of reviews *************************-------------", data);
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const boxesData = [
    {
      title: "Rating",
      data: <StarRating color="#fff" rating={store.rating} />,
    },
    { title: "Delivered", data: store.orderDelivered },
    { title: "Cancelled", data: store.orderCancelled },
    { title: "Joined", data: moment(store.createdAt).fromNow() },
  ];

  const navigation = useNavigation();

  const onDeleteStore = async e => {
    const response = await Axios.delete(
      `${constants.url}/stores/deleteStore/${store._id}`
    );
    console.log("Delete Response", response);
    if (response.status === 200) {
      fetchStoreData();
      navigation.goBack();
    } else {
      Alert.alert("Store deleting falied");
    }
  };

  const onEditStore = () => {
    navigation.navigate("EditStoreScreen", store);
  };

  console.log(
    "_----------_----------------",
    seller,
    "_________",
    store.seller?._id
  );

  return (
    <View style={styles.container}>
      {store.seller?._id === seller && (
        <View style={styles.sellerButtonRow}>
          <TouchableOpacity onPress={onEditStore} style={styles.editButton}>
            <AntDesign name="edit" size={24} color="#fff" />
            <Text style={styles.deleteButtonText}>Edit Store</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteStore} style={styles.deleteButton}>
            <MaterialIcons name="delete" size={24} color="#fff" />
            <Text style={styles.deleteButtonText}>Delete Store</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.nameRow}>
        <Text style={styles.name}>{store.name}</Text>
        <Text style={styles.productNum}>
          ( {store?.products?.length} products )
        </Text>
      </View>

      <View style={styles.boxContainer}>
        {boxesData.map(item => (
          <View key={item.title} style={styles.box}>
            <Text style={styles.boxTitle}>{item.title}</Text>
            <Text style={styles.boxData}>{item.data}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.categoryText}>Description:</Text>
      <Text style={styles.description}>{store.description}</Text>

      <Text style={styles.categoryText}>Categories:</Text>
      <View style={styles.categoryRow}>
        {store?.category?.map(
          (ctg, index) =>
            index < 2 && (
              <Text key={index} style={styles.category}>
                {ctg}
              </Text>
            )
        )}
      </View>
      <View>
        <Text style={styles.sellerText}>About the Seller:</Text>
        <View style={styles.sellerRow}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg",
            }}
          />
          <Text style={styles.sellerName}>{"Abbas"}</Text>
        </View>

        <Text style={styles.description}>{store?.seller?.description}</Text>
      </View>
      <Text
        style={[
          styles.categoryText,
          { textAlign: "center", marginVertical: 18 },
        ]}
      >
        Rating and Review
      </Text>
      <FlatList
        data={reviews}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ReviewBox
            photo={item.customerId.profileImage}
            review={item.review}
            rating={item.rating}
            createdAt={item.createdAt}
            name={item.customerId.name}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingBottom: 42,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: { fontSize: 22, fontWeight: "500" },
  productNum: {
    color: "gray",
    marginLeft: 9,
    fontWeight: "600",
    fontSize: 14,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
    color: "gray",
    marginRight: 12,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    paddingHorizontal: 28,
    marginBottom: 6,
    backgroundColor: "#e4e4e4",
  },
  box: {
    backgroundColor: "#0369a1",
    borderColor: "gray",
    width: "47%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
    color: "#fff",
  },
  boxData: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
  },
  seperator: {
    height: 20,
  },
  sellerText: {
    fontSize: 19,
    fontWeight: "600",
    width: 150,
    borderBottomColor: "#d4d4d4",
    borderBottomWidth: 2,
    marginBottom: 14,
    paddingBottom: 2,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  sellerName: { fontSize: 20, fontWeight: "600" },
  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  deleteButton: {
    backgroundColor: "red",

    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    textAlign: "center",
  },
  sellerButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: "#162a4f",

    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    textAlign: "center",

    marginRight: 14,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 5,
  },
});

const mapStateToProps = state => {
  return {
    seller: state.seller._id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(StoreHomeScreen);
