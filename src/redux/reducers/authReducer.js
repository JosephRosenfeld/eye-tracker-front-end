import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../constants/constants";
import Cookies from "js-cookie";

const initState = Cookies.get("connect.sid")
  ? { loggedIn: true, errorMessage: "", isLoading: false }
  : { loggedIn: false, errorMessage: "", isLoading: false };

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, isLoading: true };
    case LOGIN_SUCCESS:
      return { loggedIn: true, errorMessage: "", isLoading: false };
    case LOGIN_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isLoading: action.payload.isLoading,
      };
    default:
      return state;
  }
};
