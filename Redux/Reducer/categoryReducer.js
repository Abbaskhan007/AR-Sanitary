import { GET_CATEGORIES } from "../Constants";

const initialState = [];

export const categoryReducer = (state = initialState, action) => { 
  switch (action.type) {
    case GET_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
