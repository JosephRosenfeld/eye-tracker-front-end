//import { CONSTANT } from "../constants/etc.";

export const placeholderReducer = (state = 0, action) => {
  switch (action.type) {
    case "DEPOSIT": //need to switch with var later
      return state + action.payload; //return the updated state
    case "WITHDRAW":
      return state - action.payload;
    default:
      return state;
  }
};
