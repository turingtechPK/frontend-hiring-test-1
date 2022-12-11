import { createAsyncThunk } from "@reduxjs/toolkit";

import { baseApi } from "../utils/apiUtils";
import { getApiHeaders } from "../utils/urlUtils";
import { setStorageItem } from "../utils/storageUtils";

import { ACCESS_KEY } from "../constants/storageKeys";
import { REQUEST_METHODS } from "../constants/appUtilsConstants";
import { LOGIN_URI } from "../utils/apiUri";

export const loginUser = createAsyncThunk(
  "login/postLoginUser",
  async (body) => {
    const headers = getApiHeaders();
    const response = await baseApi(
      LOGIN_URI,
      headers,
      REQUEST_METHODS.POST,
      body
    );
    setStorageItem(ACCESS_KEY, response.access_token);
    return response;
  }
);
