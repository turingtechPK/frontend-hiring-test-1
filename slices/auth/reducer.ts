import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "@services/auth-api";
import { loginSuccess, authMeSuccess } from "./extra-reducers";

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: {
    id: null,
    username: null,
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authAPI.endpoints.login.matchFulfilled, loginSuccess);
    builder.addMatcher(authAPI.endpoints.authMe.matchFulfilled, authMeSuccess);
  },
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
