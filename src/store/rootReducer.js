import { combineReducers } from "@reduxjs/toolkit";
import loinUserReducer from "./slices/loginSlice";
import callListReducer from "./slices/callListSlice";

const rootReducer = combineReducers({
  loginUser: loinUserReducer,
  callsList: callListReducer,
});

export default rootReducer;
