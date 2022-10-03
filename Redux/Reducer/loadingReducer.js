import { LOADING_FALSE, LOADING_TRUE } from "../Constants";

const initialState = { loading: false, error: null };

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_TRUE: {
      return { ...state, loading: true };
    }
    case LOADING_FALSE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};
