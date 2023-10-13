import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userSlice"
import callReducer from "../feature/callSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    call: callReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
