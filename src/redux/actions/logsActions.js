import {
  GET_LOGS_SUCCESS,
  CREATE_LOG_SUCCESS,
  UPDATE_LOG_SUCCESS,
  DELETE_LOG_SUCCESS,
  LOGS_LOADING,
  LOGS_ERROR,
} from "../constants/constants";
import * as api from "../../api/index";

//Action creators
export const getLogs = () => async (dispatch) => {
  try {
    //Set loading before api call
    dispatch({
      type: LOGS_LOADING,
    });

    //Make api call
    const { data } = await api.getLogs();

    dispatch({
      type: GET_LOGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: {
        errorTxt:
          (error.response && error.response.data.errorTxt) ||
          "Unable to connect to server, please try again later",
      },
    });
  }
};

export const createLog = (newLog) => async (dispatch) => {
  try {
    //Set loading before api call
    dispatch({
      type: LOGS_LOADING,
    });

    //Make api call
    const { data } = await api.createLog(newLog);
    console.log(data);

    dispatch({
      type: CREATE_LOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: {
        errorTxt:
          (error.response && error.response.data.errorTxt) ||
          "Unable to connect to server, please try again later",
      },
    });
  }
};
export const updateLog = () => async (dispatch) => {};
export const deleteLog = () => async (dispatch) => {};
