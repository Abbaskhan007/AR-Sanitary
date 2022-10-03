import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ADD_TO_CART,
  ADD_TO_CART_LOCAL,
  CART_DATA_REQUEST,
  CART_START,
  DELETE_TO_CART_LOCAL,
  EMPTY_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_DETAILS,
  UPDATE_CART,
} from "../Constants";

const initialState = { cart: [], shipping: {}, payment: "bank" };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_START:
      return { ...state, cart: action.payload };
    case CART_DATA_REQUEST:
      return { ...state, cart: action.payload };
    case ADD_TO_CART:
      return { ...state, cart: action.payload };
    case UPDATE_CART:
      return { ...state, cart: action.payload };
    case REMOVE_FROM_CART:
      return { ...state, cart: action.payload };
    case SAVE_PAYMENT_METHOD:
      return { ...state, payment: action.payload };
    case SAVE_SHIPPING_DETAILS:
      return { ...state, shipping: action.payload };
    case EMPTY_CART:
      AsyncStorage.removeItem("cart");
      return { ...state, cart: [] };
    case DELETE_TO_CART_LOCAL:
      const newCart = state.cart.filter(
        item => item.product._id != action.payload
      );
      AsyncStorage.setItem("cart", JSON.stringify(newCart));

      return { ...state, cart: newCart };
    case ADD_TO_CART_LOCAL:
      const exist = state.cart.find(
        item => item.product._id === action.payload.product._id
      );

      console.log(action.payload);
      if (!exist) {
        const updatedCart = [
          ...state.cart,
          {
            product: action.payload.product,
            quantity: action.payload.quantity,
            _id: "",
          },
        ];
        AsyncStorage.setItem("cart", JSON.stringify(updatedCart));

        return { ...state, cart: updatedCart };
      } else {
        const updatedCart = state.cart.map(item => {
          if (item.product._id === action.payload.product._id) {
            return { ...item, quantity: action.payload.quantity };
          } else {
            return item;
          }
        });
        AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
      }
    default:
      return state;
  }
};
