import { combineReducers } from "redux";
import { viewDtReducer } from "./viewDateReducer";
import { screenSizeReducer } from "./screenSizeReducer";
import { authReducer } from "./authReducer";
import { logsReducer } from "./logsReducer";
import { settingsReducer } from "./settingsReducer";

const reducers = combineReducers({
  viewDt: viewDtReducer,
  screenSize: screenSizeReducer,
  auth: authReducer,
  logs: logsReducer,
  settings: settingsReducer,
});

export default reducers;
