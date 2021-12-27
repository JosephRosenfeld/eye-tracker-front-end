import { combineReducers } from "redux";
import { viewDtReducer } from "./viewDateReducer";
import { pageReducer } from "./pageReducer";
import { screenSizeReducer } from "./screenSizeReducer";

const reducers = combineReducers({
  viewDt: viewDtReducer,
  page: pageReducer,
  screenSize: screenSizeReducer,
});

export default reducers;
