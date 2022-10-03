import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import React, { useEffect } from "react";
import HomeScreen from "./HomeScreen";
import CustomDrawer from "./CustomDrawer";
import BottomNavigator from "./HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import SellerDashboard from "../Screens/SellerDashboard";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import RegisterationScreen from "../Screens/RegisterationScreen";
import LoginScreen from "../Screens/LoginScreen";

function MyDrawer({ user }) {
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  console.log("User-----", user);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "90%",
        },
        drawerActiveBackgroundColor: "#818cf8",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
      }}
    >
      {user.name ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="User Profile" component={ProfileScreen} />
          {user.isAdmin && (
            <Drawer.Screen name="Admin Dashboard" component={HomeScreen} />
          )}
          {user.isSeller && (
            <Drawer.Screen
              name="Seller Dashboard"
              component={SellerDashboard}
            />
          )}
          {user.isWorker && (
            <Drawer.Screen name="Worker Dashboard" component={HomeScreen} />
          )}
        </>
      ) : (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Registeration" component={RegisterationScreen} />
          <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(MyDrawer);
