import {
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_ERROR,
  GUEST_LOGIN_LOADING,
  GUEST_LOGIN_SUCCESS,
  GUEST_LOGIN_ERROR,
  ADMIN_REMOVE_ERROR,
} from "../constants/constants";
import { getLogs } from "./logsActions";
import { getSettings } from "./settingsActions";
import * as api from "../../api/index";
import Cookie from "js-cookie";

//Action creators
export const loginAdmin = (pwd) => async (dispatch) => {
  try {
    //Set loading before api call
    dispatch({
      type: ADMIN_LOGIN_LOADING,
      payload: {},
    });

    //Make api call
    const { data } = await api.loginAdmin(pwd);
    //Set cookie
    console.log(data);
    Cookie.set("loggedIn", "true", { expires: new Date(data.expires) });

    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: {},
    });

    //Now that the login was a success lets get all the data we need
    dispatch(getLogs());
    dispatch(getSettings());
  } catch (error) {
    //Catch should include invalid passwords
    dispatch({
      type: ADMIN_LOGIN_ERROR,
      payload: {
        errorTxt:
          (error.response && error.response.data.errorTxt) ||
          "Unable to connect to server, please try again later",
      },
    });
  }
};

export const loginGuest = () => async (dispatch) => {
  try {
    dispatch({
      type: GUEST_LOGIN_LOADING,
      payload: {},
    });

    //Api call
    const { data } = await api.loginGuest();
    //Set cookie
    Cookie.set("loggedIn", "true", { expires: new Date(data.expires) });

    dispatch({
      type: GUEST_LOGIN_SUCCESS,
      payload: {},
    });

    console.log("before getLogs");

    //Now that the login was a success lets get all the data we need
    dispatch(getLogs());
    console.log("after getLogs before getSettings");
    dispatch(getSettings());
  } catch (error) {
    dispatch({
      type: GUEST_LOGIN_ERROR,
      payload: {
        errorTxt: "Unable to connect to server, please try again later",
      },
    });
  }
};

export const removeAdminError = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_REMOVE_ERROR,
      payload: {},
    });
  } catch (e) {
    console.log(e);
  }
};

export const loginCheck = () => async (dispatch) => {
  try {
    const { data } = await api.loginCheck();
    if (data.isAdmin) {
      dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: {},
      });
    }
  } catch (e) {
    console.log(e);
  }
};
