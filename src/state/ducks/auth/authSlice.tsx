import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types";

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  errors: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.errors = null;
    },
    loginSuccess: (state) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.errors = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.errors = action.payload;
    },
    logout: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.errors = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
