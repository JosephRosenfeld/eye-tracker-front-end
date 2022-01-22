import { LOGIN } from "../constants/constants";
import Cookies from "js-cookie";

const initState = Cookies.get("connect.sid") ? true : false;
console.log(Cookies.get("connect.sid"));

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
};
