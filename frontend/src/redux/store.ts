import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import callsReducer from "./slices/calls.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    calls: callsReducer,
  },
});
store.subscribe(() => console.log(store.getState()));
