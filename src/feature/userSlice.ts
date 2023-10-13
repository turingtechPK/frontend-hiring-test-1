import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../utils/store";
import { login, refresh_token } from "../utils/api";
import httpClient from "../utils/httpClient";
import {startTokenRefreshTimer} from '../utils/tokenRefresh'

type LoginUser = {
  username: string;
  password: string;
};

type User = {
  user: any | null;
  authToken: string | undefined | null;
  error: any;
};

const initialState: User = {
  user: null,
  authToken: localStorage.getItem("authToken"),
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }: LoginUser, { rejectWithValue }) => {
    try {
      const { data } = await httpClient(login, "POST", {
        username: username,
        password,
      });
      return data;
    } catch (err: any) {
      let errorMessage;
      if (err.response.status !== 200) errorMessage = err.response.data;
      return rejectWithValue(errorMessage);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      const response = await httpClient(refresh_token, "POST", { refreshToken });
      if (response && response.data) {
        const { access_token, user } = response.data;
        localStorage.setItem("authToken", access_token);
        return response.data;
      } else {
        throw new Error("Invalid response format from refreshToken API");
      }
    } catch (err) {
      throw err;
    }
  }
);




startTokenRefreshTimer();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
    logout(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", JSON.stringify(action.payload.access_token));
      localStorage.setItem("refreshToken", JSON.stringify(action.payload.refresh_token));
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", JSON.stringify(action.payload.access_token));
      state.user = action.payload;
    });

    builder.addCase(refreshToken.rejected, (state, action) => {
      console.error("Token refresh failed:", action.error);
    });
  },
});

export const selectUser = (state: RootState) => state.user.user || undefined;
export const selectError = (state: RootState) => state.user.error || undefined;

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
