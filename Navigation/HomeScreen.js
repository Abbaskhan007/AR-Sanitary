import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StoreScreen from "../Screens/StoreScreen";
import CartScreen from "../Screens/CartScreen";
import WorkerScreen from "../Screens/WorkerScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import Registeration from "../Screens/RegisterationScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import TabBarButton from "./TabBarButton";
import LoginScreen from "../Screens/LoginScreen";
import ProductScreen from "../Screens/ProductScreen";

export default function HomeScreen() {
  const tabBarData = [
    {
      route: "Products",
      label: "Home",
      type: Ionicons,
      activeIcon: "home-sharp",
      inActiveIcon: "home-outline",
      component: ProductScreen,
    },
    {
      route: "Store",
      label: "Store",
      type: MaterialIcons,
      activeIcon: "storefront",
      inActiveIcon: "storefront",
      component: StoreScreen,
    },
    {
      route: "Cart",
      label: "Cart",
      type: Ionicons,
      activeIcon: "cart",
      inActiveIcon: "cart-outline",
      component: CartScreen,
      options: {
        tabBarBadge: 12,
      },
    },
    {
      route: "Workers",
      label: "Workers",
      type: Ionicons,
      activeIcon: "md-hammer-sharp",
      inActiveIcon: "md-hammer-outline",
      component: WorkerScreen,
    },
    {
      route: "Profile",
      label: "Profile",
      type: Ionicons,
      activeIcon: "md-person-sharp",
      inActiveIcon: "md-person-outline",
      component: LoginScreen,
      options: {
        tabBarStyle: {
          display: "none",
        },
      },
    },
  ];

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          position: "absolute",
          bottom: 16,
          left: 12,
          right: 12,
          borderRadius: 14,
        },
        headerShown: false,
      }}
    >
      {tabBarData.map(tab => (
        <Tab.Screen
          key={tab.route}
          name={tab.route}
          component={tab.component}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            ...tab.options,

            tabBarButton: props => {
              return <TabBarButton tab={tab} {...props} />;
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
