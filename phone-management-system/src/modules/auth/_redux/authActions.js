import { authSlice } from "./authSlice";

import * as authServices from "./authServices";
const actions = authSlice.actions;

export const login = (formData, onSuccess, onError) => async (dispatch) => {
  dispatch(actions.startCall("action"));
  try {
    const res = await authServices.login(formData);
    dispatch(actions.login(res?.data));
    onSuccess();
  } catch (error) {
    dispatch(actions.stopCall("action"));
    onError(error);
  }
};

export const refreshToken = () => async (dispatch) => {
  dispatch(actions.startCall("action"));
  try {
    const res = await authServices.refreshToken();
    dispatch(actions.refreshToken(res?.data));
  } catch (error) {
    dispatch(actions.stopCall("action"));
  }
};

export const logout = (onSuccess) => async (dispatch) => {
  dispatch(actions.startCall("action"));
  try {
    await dispatch(actions.logout());
    onSuccess();
  } catch (error) {
    dispatch(actions.stopCall("action"));
  }
};
