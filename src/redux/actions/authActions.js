import {
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_ERROR,
  GUEST_LOGIN_LOADING,
  GUEST_LOGIN_SUCCESS,
  GUEST_LOGIN_ERROR,
  ADMIN_REMOVE_ERROR,
} from "../constants/constants";
import * as api from "../../api/index";

//Action creators
export const loginAdmin = (pin) => async (dispatch) => {
  try {
    //Set loading before api call
    dispatch({
      type: ADMIN_LOGIN_LOADING,
      payload: {},
    });
    //Make api call
    const { data } = await api.loginAdmin(pin);
    //LOGIC FOR ERRORS (maybe? or does the api automatically throw an error?)
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: {},
    });
  } catch (error) {
    //Catch should include invalid pins
    dispatch({
      type: ADMIN_LOGIN_ERROR,
      payload: {
        errorTxt:
          (error.response && error.response.data.errorTxt) ||
          "Unable to connect to server, please try again later",
        isLoading: false,
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
    const { data } = await api.loginGuest();
    //LOGIC FOR ERRORS (maybe? or does the api automatically throw an error?)
    dispatch({
      type: GUEST_LOGIN_SUCCESS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GUEST_LOGIN_ERROR,
      payload: {
        errorTxt: "Unable to connect to server, please try again later",
        isLoading: false,
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
