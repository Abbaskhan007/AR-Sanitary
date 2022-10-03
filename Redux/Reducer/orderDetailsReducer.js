import { SELECT_PAYMENT_METHOD, SELECT_SHIPPING_ADDRESS } from "../Constants";

const initialState = { shippingAddress: {}, paymentMethod: null };

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case SELECT_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
