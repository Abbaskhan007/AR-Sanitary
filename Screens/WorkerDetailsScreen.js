import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import constants from "../assets/constants";
import StoreHomeScreen from "./StoreHomeScreen";
import StoreProductScreen from "./StoreProductScreen";
import BackButton from "../Components/BackButton";
import StarRating from "../Components/StarRating";
import moment from "moment";
import Header from "../Components/Header";

export default function WorkerDetailsScreen({ route }) {
  const [workerData, setWorkerData] = useState(false);
  const { workerId } = route.params;

  const getWorkerData = async () => {
    const { data } = await Axios.get(
      `${constants.url}/worker/getWorkers/${workerId}`
    );
    console.log("Store Data", data);
    setWorkerData(data);
  };

  console.log("Worker Data _________", workerData);

  useEffect(() => {
    getWorkerData();
  }, []);

  if (!workerData) {
    return <View></View>;
  } else {
    console.log("Worker Data in....", workerData);
    const boxesData = [
      {
        title: "Rating",
        data: <StarRating color="#fff" rating={workerData.rating} />,
      },
      { title: "Completed", data: workerData.projectsCompleted },
      { title: "Cancelled", data: workerData.projectCancelled },
      { title: "Joined", data: moment(workerData.createdAt).fromNow() },
    ];
    return (
      <ScrollView style={styles.container}>
        <View style={{ position: "absolute", top: 10, zIndex: 20 }}>
          <Header />
        </View>

        <Image
          style={styles.bannerImage}
          source={{ uri: workerData?.images[0] }}
        />

        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{workerData.user.name}</Text>
            <Text style={styles.projectsNum}>
              ({workerData.projectsCompleted})
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
          <Text style={styles.description}>{workerData.description}</Text>
          <Text style={styles.categoryText}>Categories:</Text>
          <View style={styles.categoryRow}>
            {workerData?.category?.map(
              (ctg, index) =>
                index < 2 && (
                  <Text key={index} style={styles.category}>
                    {ctg}
                  </Text>
                )
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
 
  },
  bannerImage: {
    width: 500,
    height: 250,
    resizeMode: "cover",
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  button: {
    flex: 1,
    borderColor: "#d4d4d4",
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 19,
    color: "gray",
  },
  //////
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: { fontSize: 22, fontWeight: "500" },
  projectsNum: {
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
    //borderWidth: 2,
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
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  infoContainer: {
    padding: 22,
  },
});
