import { combineReducers } from "redux";
import { viewDtReducer } from "./viewDateReducer";
import { screenSizeReducer } from "./screenSizeReducer";
import { authReducer } from "./authReducer";

const reducers = combineReducers({
  viewDt: viewDtReducer,
  screenSize: screenSizeReducer,
  auth: authReducer,
});

export default reducers;
