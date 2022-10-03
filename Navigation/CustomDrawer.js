import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { connect } from "react-redux";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LOGOUT } from "../Redux/Constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CustomDrawer(props) {
  const { user, logout } = props;
  console.log("USer", user);
  const navigation = useNavigation();

  const onLogout = () => {
    logout();
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.bg}>
          <Pressable
            onPress={() => props.navigation.closeDrawer()}
            style={styles.editIcon}
          >
            <AntDesign name="close" size={22} color="white" />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.editIcon}
          >
            <Entypo
              style={styles.iconStyle}
              name="edit"
              size={20}
              color="white"
            />
          </Pressable>
        </View>
        <View style={styles.userInfo}>
          <Image style={styles.image} source={{ uri: user.profileImage }} />
          <Text style={styles.name}>{user.name}</Text>
          <View style={styles.infoRow}>
            <AntDesign name="mail" size={20} color="gray" />
            <Text style={styles.rowText}>{user.email}</Text>
          </View>
          {user.phoneNumber && (
            <View style={styles.infoRow}>
              <AntDesign name="phone" size={20} color="gray" />
              <Text style={styles.rowText}>{user.phoneNumber}</Text>
            </View>
          )}
          {user.address && (
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color="gray" />
              <Text style={styles.rowText}>{user.address}</Text>
            </View>
          )}
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Pressable onPress={() => onLogout()} style={styles.logoutRow}>
        <AntDesign name="logout" size={20} color="#818cf8" />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#edeceb",
  },
  bg: {
    backgroundColor: "#818cf8",
    height: 225,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -52,
    paddingTop: 35,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginHorizontal: 40,
    backgroundColor: "#fff",
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.39,
    shadowRadius: 4.65,

    elevation: 7,
    marginTop: -110,
    marginBottom: 24,
  },
  image: {
    height: 110,
    width: 110,

    borderRadius: 125,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rowText: {
    color: "gray",
    fontSize: 15,
    marginLeft: 4,
  },
  logoutRow: {
    flexDirection: "row",
    margin: 14,
    marginBottom: Platform.OS === "ios" ? 32 : 20,
  },
  logoutText: {
    color: "#818cf8",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  editIcon: {
    backgroundColor: "rgba(232,234,237, 0.4)",
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,

    margin: 12,
  },
});

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch({
        type: LOGOUT,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
