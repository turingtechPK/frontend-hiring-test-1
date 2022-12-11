import { createSlice } from "@reduxjs/toolkit";

import { REQ_STATUSES } from "../../constants/appUtilsConstants";
import { loginUser } from "../../thunks/loginThunk";
import { isValidSession } from "../../utils/storageUtils";

const initialState = {
  status: REQ_STATUSES.idle,
  user: null,
  isAuthed: isValidSession(),
};

const loginUserPending = (state) => ({
  ...state,
  status: REQ_STATUSES.loading,
  isAuthed: false,
});

const loginUserFulfilled = (state, response) => {
  state.status = REQ_STATUSES.succeeded;
  state.user = response.user;
  state.isAuthed = true;
  return state;
};

const loginUserRejected = (state) => {
  return { ...state, status: REQ_STATUSES.failed, isAuthed: false };
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => loginUserPending(state),
    [loginUser.fulfilled]: (state, { payload }) =>
      loginUserFulfilled(state, payload),
    [loginUser.rejected]: (state) => loginUserRejected(state),
  },
});

export const loginSelector = (state) => state.loginUser;
export const { actions } = loginSlice;
export default loginSlice.reducer;
