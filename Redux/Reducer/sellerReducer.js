import { CART_START, FETCH_SELLER_DATA, LOGOUT, SELLER_START } from "../Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const seller = {};
export const sellerReducer = (state = seller, action) => {
  console.log("Actions-----------", action);
  switch (action.type) {
    case SELLER_START:
      return { ...action.payload };
    case FETCH_SELLER_DATA:
      return { ...action.payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
