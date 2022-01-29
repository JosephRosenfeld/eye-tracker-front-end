import { GET_LOGS } from "../constants/constants";

export const changeScreenSize = (screenSize) => {
  return {
    type: CHANGE_SIZE,
    payload: screenSize,
  };
};
