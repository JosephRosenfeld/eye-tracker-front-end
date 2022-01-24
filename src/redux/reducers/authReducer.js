import {
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_ERROR,
  GUEST_LOGIN_LOADING,
  GUEST_LOGIN_SUCCESS,
  GUEST_LOGIN_ERROR,
  ADMIN_REMOVE_ERROR,
} from "../constants/constants";
import Cookies from "js-cookie";

const initState = {
  adminIsLoading: false,
  adminLoggedIn: false,
  adminErrorTxt: "",
  guestIsLoading: false,
  guestLoggedIn: !!Cookies.get("connect.sid"),
  guestErrorTxt: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_LOADING:
      return { ...state, adminIsLoading: true };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        adminIsLoading: false,
        adminLoggedIn: true,
        adminErrorTxt: "",
        guestLoggedIn: false,
        guestErrorTxt: "",
      };
    /*We shouldn't have to reset guestIsLoading above (should be taken care of in
        the guest actions)*/
    case ADMIN_LOGIN_ERROR:
      return {
        ...state,
        adminErrorTxt: action.payload.errorTxt,
        adminIsLoading: false,
      };
    case GUEST_LOGIN_LOADING:
      return { ...state, guestIsLoading: true };
    case GUEST_LOGIN_SUCCESS:
      return {
        ...state,
        adminLoggedIn: false,
        adminErrorTxt: "",
        guestIsLoading: false,
        guestLoggedIn: true,
        guestErrorTxt: "",
      };
    case GUEST_LOGIN_ERROR:
      return {
        ...state,
        guestErrorTxt: action.payload.errorTxt,
        guestIsLoading: false,
      };
    case ADMIN_REMOVE_ERROR:
      return {
        ...state,
        adminErrorTxt: "",
      };
    default:
      return state;
  }
};
