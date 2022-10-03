import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function TrackOrder({ status }) {
  console.log("Status____", status);
  let num;
  if (status === "Pending") {
    num = 1;
  } else if (status === "Shipped") {
    num = 2;
  } else if (status === "EnRoute") {
    num = 3;
  } else if (status === "Delivered") {
    num = 4;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TrackOrder</Text>
      <View style={styles.lineRow}>
        <View
          style={[
            styles.line,
            num > 1 ? styles.activeLine : styles.inActiveLine,
          ]}
        >
          <View style={{ ...styles.ball, marginLeft: -2 }}>
            {num >= 1 && (
              <AntDesign name="checkcircleo" size={16} color="#fff" />
            )}
          </View>
        </View>
        <View
          style={[
            styles.line,
            num > 2 ? styles.activeLine : styles.inActiveLine,
          ]}
        >
          <View style={styles.ball}>
            {num >= 2 && (
              <AntDesign name="checkcircleo" size={16} color="#fff" />
            )}
          </View>
        </View>
        <View
          style={[
            styles.line,
            num > 3 ? styles.activeLine : styles.inActiveLine,
          ]}
        >
          <View style={styles.ball}>
            {num >= 3 && (
              <AntDesign name="checkcircleo" size={16} color="#fff" />
            )}
          </View>
        </View>
        <View
          style={[
            { borderTopWidth: 8, position: "relative" },
            num > 4 ? styles.activeLine : styles.inActiveLine,
          ]}
        >
          <View style={[styles.ball, { right: -8, marginRight: 0 }]}>
            {num >= 4 && (
              <AntDesign name="checkcircleo" size={16} color="#fff" />
            )}
          </View>
        </View>
      </View>
      <View style={styles.row2}>
        <View style={{ alignItems: "center" }}>
          <Ionicons name="ios-newspaper" size={24} color="#111827" />
          <Text style={styles.status}>Pending</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <FontAwesome5 name="box-open" size={24} color="#111827" />
          <Text style={styles.status}>Shipped</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons
            name="truck-fast-outline"
            size={24}
            color="#111827"
          />
          <Text style={styles.status}>Enroute</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Entypo name="home" size={24} color="#111827" />
          <Text style={styles.status}>Delivered</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    borderColor: "#f3f4f6",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 6,
    backgroundColor: "#fff",
    borderColor: "#d4d4d4",
    borderWidth: 1,
    marginVertical: 20
  },
  lineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  line: {
    flex: 1,
    borderTopWidth: 8,
    position: "relative",
  },
  inActiveLine: {
    borderTopColor: "#ddd6fe",
  },
  activeLine: {
    borderTopColor: "#8b5cf6",
  },
  ball: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#8b5cf6",
    position: "absolute",
    top: -21,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -18,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  status: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 4,
    color: "#111827",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 14,
  },
});
