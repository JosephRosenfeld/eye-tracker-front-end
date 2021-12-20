import { combineReducers } from "redux";
import { viewDtReducer } from "./viewDateReducer";

const reducers = combineReducers({
  viewDt: viewDtReducer,
});

export default reducers;
