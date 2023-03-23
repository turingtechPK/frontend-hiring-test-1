import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { authSlice } from "modules/auth/_redux/authSlice";
import { callSlice } from "modules/phone-management/_redux/callSlice";
import storage from "redux-persist/lib/storage";

export const userPersistConfig = {
  key: "access_token",
  storage,
  whitelist: ["access_token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(userPersistConfig, authSlice.reducer),
  callInfoManagement: callSlice.reducer,
});

export default rootReducer;
