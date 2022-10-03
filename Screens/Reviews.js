import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React from "react";
import Header from "../Components/Header";
import { useRoute } from "@react-navigation/native";
import ReviewBox from "../Components/ReviewBox";
import StarRating from "../Components/StarRating";

export default function Reviews() {
  const route = useRoute();
  const { reviews, rating } = route.params;

  console.log("----------", route.params);
  return (
    <View style={styles.container}>
      <Header />

      {reviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Rating Available</Text>
        </View>
      ) : (
        <View style={styles.topRow}>
          <View style={styles.numStarRow}>
            <Text style={styles.numStar}>{rating}</Text>
            <Text style={styles.totalStar}>/ 5</Text>
            <StarRating rating={rating} />
          </View>
          <Text style={styles.numRating}>{reviews.length} Reviews</Text>
        </View>
      )}

      <FlatList
        data={reviews}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ReviewBox
            photo={item?.user?.profileImage}
            name={item?.user?.name}
            rating={item.rating}
            review={item.message}
          />
        )}
        style={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 22, backgroundColor: "#fff" },
  numStarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  numStar: {
    fontSize: 20,
    fontWeight: "500",
  },
  totalStar: {
    color: "gray",
    fontSize: 18,
    marginLeft: 2,
    marginRight: 12,
  },
  numRating: {
    textAlign: "center",
    marginTop: 6,
    color: "gray",
  },
  topRow: {
    marginVertical: 24,
  },
});
