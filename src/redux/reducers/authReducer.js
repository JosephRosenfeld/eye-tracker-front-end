import { LOGIN } from "../constants/constants";

export const authReducer = (state = false, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
};
