import React, { useEffect } from "react";
import "./Components/ignoreWarnings";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
} from "react-native";
import HomeScreen from "./Screens/ProductScreen";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetail from "./Screens/ProductDetail";
import constants from "./assets/constants";
import { Provider } from "react-redux";
import { store } from "./Redux/combineReducer";
import BottomNavigator from "./Navigation/HomeScreen";
import MyDrawer from "./Navigation/MyDrawer";
import RegisterationScreen from "./Screens/RegisterationScreen";
import LoginScreen from "./Screens/LoginScreen";
import StoreDetailsScreen from "./Screens/StoreDetailsScreen";
import StoreProductScreen from "./Screens/StoreProductScreen";
import StoreHomeScreen from "./Screens/StoreHomeScreen";
import CartScreen from "./Screens/CartScreen";
import WorkerDetailsScreen from "./Screens/WorkerDetailsScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import EditProfileScreen from "./Screens/EditProfileScreen";
import EditProductScreen from "./Screens/EditProductScreen";
import EditStoreScreen from "./Screens/EditStoreScreen";
import Checkout from "./Screens/Checkout";
import ProductScreen from "./Screens/ProductScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import SelectShippingAddressScreen from "./Screens/SelectShippingAddressScreen";
import SelectPaymentMethod from "./Screens/SelectPaymentMethod";
import Reviews from "./Screens/Reviews";
import OrdersScreen from "./Screens/OrdersScreen";
import OrderDetailScreen from "./Screens/OrderDetailScreen";
import ARView from "./Screens/ARView";
import SellerOrders from "./Screens/SellerOrders";
import ProfileScreen from "./Screens/ProfileScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {<Stack.Screen name="Drawer" component={MyDrawer} />}
            <Stack.Screen name="HomeScreen" component={BottomNavigator} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Products" component={ProductScreen} />

            <Stack.Screen
              name="Registeration"
              component={RegisterationScreen}
            />
            <Stack.Screen
              name="Shipping Address"
              component={ShippingAddressScreen}
            />

            {<Stack.Screen name="LoginScreen" component={LoginScreen} />}
            <Stack.Screen
              name="StoreDetailsScreen"
              component={StoreDetailsScreen}
            />
            <Stack.Screen
              name="StoreProductScreen"
              component={StoreProductScreen}
            />
            <Stack.Screen
              name="WorkerDetailsScreen"
              component={WorkerDetailsScreen}
            />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="StoreHomeScreen" component={StoreHomeScreen} />
            <Stack.Screen
              name="EditProductScreen"
              component={EditProductScreen}
            />
            <Stack.Screen name="EditStoreScreen" component={EditStoreScreen} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen
              name="SelectShippingScreen"
              component={SelectShippingAddressScreen}
            />
            <Stack.Screen
              name="SelectPaymentMethod"
              component={SelectPaymentMethod}
            />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="SellerOrders" component={SellerOrders} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            <Stack.Screen name="User Profile" component={ProfileScreen} />
            <Stack.Screen name="ARView" component={ARView} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
