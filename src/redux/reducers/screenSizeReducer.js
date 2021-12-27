import { CHANGE_SIZE } from "../constants/constants";

export const screenSizeReducer = (state = window.innerWidth, action) => {
  switch (action.type) {
    case CHANGE_SIZE:
      return action.payload;
    default:
      return state;
  }
};
