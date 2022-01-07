import { combineReducers } from "redux";
import { viewDtReducer } from "./viewDateReducer";
import { screenSizeReducer } from "./screenSizeReducer";

const reducers = combineReducers({
  viewDt: viewDtReducer,
  screenSize: screenSizeReducer,
});

export default reducers;
