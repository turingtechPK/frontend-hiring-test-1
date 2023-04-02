import { CallState, AuthState, CallResponse } from "./types";
import { configureStore } from "@reduxjs/toolkit";
import callReducer from "./ducks/calls/callSlice";
import "./global.d.ts";
import  authSlice  from "./ducks/auth/authSlice";

export interface IApplicationState {
  calls: CallState;
  auth: AuthState;
}

const store = configureStore({
  reducer: {
    calls: callReducer,
    auth: authSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
