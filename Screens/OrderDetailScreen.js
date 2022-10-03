import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import constants from "../assets/constants";
import { useRoute } from "@react-navigation/native";
import Axios from "axios";
import Header from "../Components/Header";
import LoadingScreen from "./LoadingScreen";
import moment from "moment";
import StarRating from "../Components/StarRating";
import orderReducer from "../Redux/Reducer/orderDetailsReducer";
import { Feather, FontAwesome } from "@expo/vector-icons";

import TrackOrder from "../Components/TrackOrder";
import { connect } from "react-redux";

function OrderDetailScreen({ seller }) {
  const orderId = useRoute().params;
  const [orderData, setorderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const [reload, setReload] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const onMenuSelect = item => {
    setUpdatedStatus(item);
  };

  let bgStatus =
    orderData?.status === "Pending"
      ? "#fed7aa"
      : orderData?.status === "EnRoute"
      ? "#fef3c7"
      : orderData?.status === "Delivered"
      ? "#bbf7d0"
      : "#fca5a5";
  let textStatus =
    orderData?.status === "Pending"
      ? "#f97316"
      : orderData?.status === "EnRoute"
      ? "#facc15"
      : orderData?.status === "Delivered"
      ? "#4ade80"
      : "#f87171";

  const fetchOrder = async () => {
    setLoading(true);
    const { data } = await Axios.get(
      `${constants.url}/orders/getOrder/${orderId}`
    );
    console.log("Data", data);
    setorderData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, [reload]);

  const onUpdateStatus = async () => {
    setShowStatusMenu(false);
    setLoading(true);
    const { data } = await Axios.put(`${constants.url}/orders/updateOrder`, {
      orderId,
      status: updatedStatus,
    });
    fetchOrder();
    setLoading(false);
  };

  let color = "#a78bfa";

  const onSubmit = async () => {
    console.log("--------");
    const { data } = await Axios.put(`${constants.url}/orders/rate`, {
      review,
      rating: stars,
      orderId: orderData._id,
    });
    setorderData(data);
    console.log("Data___", data);
  };

  const onClose = () => {
    setModel(false);
  };

  if (!orderData || loading) {
    return <LoadingScreen />;
  }

  const MenuBox = () => {
    return (
      <View style={styles.menu}>
        <TouchableOpacity
          onPress={() => onMenuSelect("Pending")}
          style={styles.menuItem}
        >
          <Text
            style={[
              styles.menuText,
              updatedStatus === "Pending" && { color: "#6366f1" },
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onMenuSelect("EnRoute")}
          style={styles.menuItem}
        >
          <Text
            style={[
              styles.menuText,
              updatedStatus === "EnRoute" && { color: "#6366f1" },
            ]}
          >
            EnRoute
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onMenuSelect("Delivered")}
          style={styles.menuItem}
        >
          <Text
            style={[
              styles.menuText,
              updatedStatus === "Delivered" && { color: "#6366f1" },
            ]}
          >
            Delivered
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onMenuSelect("Cancelled")}
          style={styles.menuItem}
        >
          <Text
            style={[
              styles.menuText,
              updatedStatus === "Cancelled" && { color: "#6366f1" },
            ]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onUpdateStatus}
          disabled={!updatedStatus}
          style={[
            updatedStatus
              ? { backgroundColor: "#bbf7d0" }
              : { backgroundColor: "#f3f4f6" },
            {
              padding: 12,
              overflow: "hidden",
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            },
          ]}
        >
          <Text
            style={
              updatedStatus
                ? {
                    color: "#22c55e",
                    fontSize: 18,
                    fontWeight: "500",
                    textAlign: "center",
                    zIndex: 120,
                  }
                : {
                    color: "#6b7280",
                    fontSize: 18,
                    fontWeight: "500",
                    textAlign: "center",
                    zIndex: 120,
                  }
            }
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
      <Header />
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.key}>Name:</Text>
          <Text style={styles.value}>{orderData.productId.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Quantity:</Text>
          <Text style={styles.value}>{orderData.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>User:</Text>
          <View style={styles.imageRow}>
            <Image
              source={{ uri: orderData.customerId.profileImage }}
              style={styles.imageAvatar}
            />
          </View>
          <Text style={styles.value}>{orderData.customerId.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Store:</Text>
          <View style={styles.imageRow}>
            <Image
              source={{ uri: orderData.productId.store.image }}
              style={styles.imageAvatar}
            />
          </View>
          <Text style={styles.value}> {orderData.productId.store.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Delivery Address:</Text>
          <Text style={[styles.value, { flexWrap: "wrap", flex: 1 }]}>
            {`${orderData?.shippingAddress.address}, ${orderData?.shippingAddress.area}, ${orderData?.shippingAddress.city}, ${orderData?.shippingAddress.province}`}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Payment Method:</Text>
          <Text style={styles.value}>{orderData.paymentMethod}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Delivery Status:</Text>
          <Text
            style={[
              {
                backgroundColor: bgStatus,
                color: textStatus,
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: 8,
                overflow: "hidden",
                fontSize: 18,
                fontWeight: "600",
              },
            ]}
          >
            {orderData.status}
          </Text>

          {orderData.sellerId === seller && (
            <View style={{ position: "relative" }}>
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => setShowStatusMenu(!showStatusMenu)}
              >
                <Feather name="edit" size={24} color="#4b5563" />
              </TouchableOpacity>
              {showStatusMenu && <MenuBox />}
            </View>
          )}
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Total:</Text>
          <Text style={styles.value}>
            {orderData.paymentMethod === "bank" ? "Rs. " : "Eth. "} $
            {orderData?.amount}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Date:</Text>
          <Text style={styles.value}>
            {moment(orderData.createdAt).format("YYYY-MM-DD")}
          </Text>
        </View>

        {orderData.rating ? (
          <View>
            <Text style={styles.key}>My Rating</Text>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingNum}>{`${orderData.rating} Star`}</Text>
              <StarRating rating={orderData.rating} />
            </View>
            <View>
              <Text style={styles.key}>My Review</Text>
              <Text style={styles.description}>{orderData.review}</Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.key}>Rate the Product</Text>
            <View style={styles.starRow}>
              {stars >= 1 ? (
                <FontAwesome
                  onPress={() => setStars(1)}
                  name="star"
                  size={18}
                  color={color}
                  style={styles.star}
                />
              ) : (
                <Feather
                  name="star"
                  onPress={() => setStars(1)}
                  size={18}
                  color={color}
                  style={styles.star}
                />
              )}
              {stars >= 2 ? (
                <FontAwesome
                  onPress={() => setStars(2)}
                  name="star"
                  size={18}
                  color={color}
                  style={styles.star}
                />
              ) : (
                <Feather
                  onPress={() => setStars(2)}
                  name="star"
                  size={18}
                  color={color}
                  style={styles.star}
                />
              )}
              {stars >= 3 ? (
                <FontAwesome
                  onPress={() => setStars(3)}
                  name="star"
                  size={18}
                  color={color}
                  style={styles.star}
                />
              ) : (
                <Feather
                  onPress={() => setStars(3)}
                  name="star"
                  size={18}
                  color={color}
                  style={styles.star}
                />
              )}
              {stars >= 4 ? (
                <FontAwesome
                  onPress={() => setStars(4)}
                  name="star"
                  size={18}
                  color={color}
                  style={styles.star}
                />
              ) : (
                <Feather
                  onPress={() => setStars(4)}
                  name="star"
                  size={18}
                  color={color}
                  style={styles.star}
                />
              )}
              {stars >= 5 ? (
                <FontAwesome
                  onPress={() => setStars(5)}
                  name="star"
                  size={18}
                  color={color}
                  style={styles.star}
                />
              ) : (
                <Feather
                  onPress={() => setStars(5)}
                  name="star"
                  size={18}
                  color={color}
                  style={styles.star}
                />
              )}
            </View>
            <Text style={styles.key}>Give Your Honest Review </Text>
            <TextInput
              value={review}
              onChangeText={setReview}
              placeholder="Type Your Review"
              style={styles.inputField}
            />
            <TouchableOpacity
              disabled={!stars || !review}
              style={[
                styles.submitButton,
                {
                  backgroundColor: stars && review ? "#bbf7d0" : "#f3f4f6",
                },
              ]}
              onPress={onSubmit}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  { color: stars && review ? "#4ade80" : "#9ca3af" },
                ]}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <TrackOrder status={orderData.status} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 54,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  key: {
    fontSize: 20,
    fontWeight: "500",
    marginRight: 22,
  },
  value: {
    fontSize: 18,
    fontWeight: "400",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageAvatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 8,
  },
  ratingBox: {
    backgroundColor: "#e5e7eb",
    width: 150,
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  ratingNum: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "gray",
    paddingVertical: 4,
    paddingLeft: 16,
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 18,
  },
  star: {
    fontSize: 42,
    marginHorizontal: 6,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#d4d4d4",
    padding: 12,
    fontSize: 16,
    color: "gray",
    height: 100,
    marginVertical: 10,
    borderRadius: 8,
  },
  submitButton: {
    alignSelf: "flex-end",
    width: 110,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  submitButtonText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 17,
  },
  menu: {
    borderColor: "gray",
    borderWidth: 1,
    width: 140,
    borderRadius: 12,
    position: "absolute",
    backgroundColor: "white",
    zIndex: 100,
    elevation: 100,
    top: 52,
    left: -42,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 10,
  },
  menuText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
  menuButton: {
    padding: 12,
  },
  editIcon: {
    marginLeft: 12,
    backgroundColor: "#e5e7eb",

    borderRadius: 40,
    width: 52,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = state => {
  console.log("State", state.seller._id);
  return {
    seller: state.seller._id,
  };
};

export default connect(mapStateToProps)(OrderDetailScreen);
