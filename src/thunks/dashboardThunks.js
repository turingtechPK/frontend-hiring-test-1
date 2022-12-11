import { createAsyncThunk } from "@reduxjs/toolkit";
import { REQUEST_METHODS } from "../constants/appUtilsConstants";
import { CALLS_LIST_URI } from "../utils/apiUri";
import { baseApi } from "../utils/apiUtils";
import { getToken } from "../utils/storageUtils";
import { getApiHeaders } from "../utils/urlUtils";

export const getCallList = createAsyncThunk(
  "callList/getCallList",
  async (queryParams) => {
    const token = getToken();
    const headers = getApiHeaders(token);
    const apiUri = !queryParams
      ? CALLS_LIST_URI
      : `${CALLS_LIST_URI}?${queryParams}`;
    const response = await baseApi(apiUri, headers, REQUEST_METHODS.GET);
    return response;
  }
);
