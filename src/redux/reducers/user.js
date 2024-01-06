import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('USER_INFO_REQUEST', (state) => {
      state.loginLoading = true;
    })
    .addCase('USER_INFO_SUCCESS', (state, action) => {
      state.userLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.userError = null;
    })
    .addCase('USER_INFO_FAIL', (state, action) => {
      state.userLoading = false;
      state.isAuthenticated = false;
      state.userError = action.payload;
      state.user = null;
    })
    .addCase('CLEAR_ERROR', (state) => {
      state.error = null;
    });
});
