import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducer/cartReducer";
import { categoryReducer } from "./Reducer/categoryReducer";
import { loadingReducer } from "./Reducer/loadingReducer";
import orderReducer from "./Reducer/orderDetailsReducer";
import { productReducer } from "./Reducer/productReducer";
import { sellerReducer } from "./Reducer/sellerReducer";
import { storeReducer } from "./Reducer/storeReducer";
import { userReducer } from "./Reducer/userReducer";
import { workerCategoryReducer } from "./Reducer/workerCategoryReducer";
import { workerReducer } from "./Reducer/workerReducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  productList: productReducer,
  user: userReducer,
  cart: cartReducer,
  store: storeReducer,
  categories: categoryReducer,
  worker: workerReducer,
  workerCategories: workerCategoryReducer,
  loading: loadingReducer,
  seller: sellerReducer,
  orderDetails: orderReducer,
});

export const store = createStore(
  reducer,
  {},
  composeEnhancer(applyMiddleware(thunk))
);
