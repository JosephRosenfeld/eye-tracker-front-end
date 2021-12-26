import { combineReducers } from "redux";
import { viewDtReducer } from "./viewDateReducer";
import { pageReducer } from "./pageReducer";

const reducers = combineReducers({
  viewDt: viewDtReducer,
  page: pageReducer,
});

export default reducers;
