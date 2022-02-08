import {
  LOGS_LOADING,
  GET_LOGS_SUCCESS,
  CREATE_LOG_SUCCESS,
  UPDATE_LOG_SUCCESS,
  DELETE_LOG_SUCCESS,
  LOGS_ERROR,
} from "../constants/constants";

const initialState = {
  logsIsLoading: false,
  logs: [],
  logsErrorTxt: "",
};

export const logsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGS_LOADING:
      return { ...state, logsIsLoading: true };
    case GET_LOGS_SUCCESS:
      return { logsIsLoading: false, logs: action.payload, logsErrorTxt: "" };
    case CREATE_LOG_SUCCESS:
      return {
        logsIsLoading: false,
        logs: [...state.logs, action.payload],
        logsErrorTxt: "",
      };
    case UPDATE_LOG_SUCCESS:
      return {
        logsIsLoading: false,
        logs: state.logs.map((log) =>
          log.log_id === action.payload.log_id ? action.payload : log
        ),
        logsErrorTxt: "",
      };
    case DELETE_LOG_SUCCESS:
      return {
        logsIsLoading: false,
        logs: state.logs.filter((log) => log.log_id !== action.payload),
        logsErrorTxt: "",
      };
    case LOGS_ERROR:
      return {
        ...state,
        logIsLoading: false,
        logErrorTxt: action.payload.errorTxt,
      };
    default:
      return state;
  }
};
