import {
  SETTINGS_LOADING,
  GET_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_SUCCESS,
  SETTINGS_ERROR,
} from "../constants/constants";
import * as api from "../../api/index";

//Action creators
export const getSettings = () => async (dispatch) => {
  try {
    //Set loading before api call
    dispatch({
      type: SETTINGS_LOADING,
    });

    //Make api call
    const { data } = await api.getSettings();

    dispatch({
      type: GET_SETTINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SETTINGS_ERROR,
      payload: {
        errorTxt:
          (error.response && error.response.data.errorTxt) ||
          "Unable to connect to server, please try again later",
      },
    });
  }
};

export const updateSettings = (settings_obj) => async (dispatch) => {
  try {
    //Set loading before api call
    dispatch({
      type: SETTINGS_LOADING,
    });

    //Make api call
    const { data } = await api.updateSettings(settings_obj);

    dispatch({
      type: UPDATE_SETTINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SETTINGS_ERROR,
      payload: {
        errorTxt:
          (error.response && error.response.data.errorTxt) ||
          "Unable to connect to server, please try again later",
      },
    });
  }
};
