import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  token: string | null;
  username: string | null;
}

const initialState: authState = {
  token: localStorage.getItem("authToken") || null,
  username: localStorage.getItem("username") || null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; username: string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout, refreshToken } = authSlice.actions;
export default authSlice.reducer;
