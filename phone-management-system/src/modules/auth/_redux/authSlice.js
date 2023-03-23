import { createSlice } from "@reduxjs/toolkit";
import localStorage from "redux-persist/es/storage";

const initialAuthState = {
  access_token:
    typeof localStorage.getItem("access_token") === "string"
      ? localStorage.getItem("access_token")
      : null,
  refresh_token:
    typeof localStorage.getItem("refresh_token") === "string"
      ? localStorage.getItem("refresh_token")
      : null,
  actionLoading: false,
  listLoading: false,
  user: null,
  isAuthorized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    startCall: (state, action) => {
      if (action.payload === "action") {
        state.actionLoading = true;
      } else {
        state.listLoading = true;
      }
    },
    stopCall: (state, action) => {
      if (action.payload === "action") {
        state.actionLoading = false;
      } else {
        state.listLoading = false;
      }
    },
    login: (state, action) => {
      const { user, access_token, refresh_token } = action.payload;
      state.user = user;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.isAuthorized = true;
      state.actionLoading = false;
    },
    logout: (state, action) => {
      localStorage.removeItem("access_token");
      state.access_token = null;
      state.refresh_token = null;
      state.actionLoading = false;
      state.listLoading = false;
      state.user = null;
    },
    refreshToken: (state, action) => {
      const { user, access_token } = action.payload;
      state.user = user;
      state.access_token = access_token;
      state.actionLoading = false;
      state.isAuthorized = true;
    },
  },
});
