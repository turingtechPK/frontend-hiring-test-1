import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { callReducer } from "./call";
const reducers = combineReducers({
  user: userReducer,
  calls: callReducer
});

export default reducers;
