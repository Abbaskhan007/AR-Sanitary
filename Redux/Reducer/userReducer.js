import AsyncStorage from "@react-native-async-storage/async-storage";
import { START_USER } from "../Constants";
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  REGISTERATION_REQUEST,
  REGISTERATION_REQUEST_FAIL,
  REGISTERATION_REQUEST_SUCCESS,
  LOGOUT,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
} from "../Constants";

const initialState = { loading: false, error: false, user: {} };

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_USER:
      return { ...state, user: action.payload };
    case REGISTERATION_REQUEST:
      return { ...state, loading: true };
    case REGISTERATION_REQUEST_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case REGISTERATION_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_REQUEST_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_REQUEST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("cart");
      return { ...state, user: {} };
    case UPDATE_PROFILE:
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case DELETE_ACCOUNT:
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("cart");
      return { ...state, user: [] };
    default:
      return state;
  }
};


