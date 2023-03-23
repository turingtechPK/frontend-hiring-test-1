import { callSlice } from "./callSlice";

import * as callServices from "./callServices";
const actions = callSlice.actions;

export const getCallsInfo = (params) => async (dispatch) => {
  dispatch(actions.startCall("listing"));
  try {
    const res = await callServices.getCallsInfo(params);
    await dispatch(actions.getCallsInfo(res?.data));
  } catch (error) {
    dispatch(actions.stopCall("listing"));
  }
};

export const getCallsInfoById = (id) => async (dispatch) => {
  dispatch(actions.startCall("action"));
  try {
    const res = await callServices.getCallsInfoById(id);
    await dispatch(actions.getSelectedCallInfo(res?.data));
  } catch (error) {
    dispatch(actions.stopCall("action"));
  }
};

export const archiveCalls = (id, onSuccess, onError) => async (dispatch) => {
  dispatch(actions.startCall("action"));
  try {
    const res = await callServices.archiveCall(id);
    onSuccess(res);
  } catch (error) {
    onError(error);
    dispatch(actions.stopCall("action"));
  }
};

export const addNotes = (payload, onSuccess, onError) => async (dispatch) => {
  const { id, content } = payload;
  dispatch(actions.startCall("action"));
  try {
    const res = await callServices.addNote(id, content);
    dispatch(actions.stopCall("action"));
    onSuccess(res);
  } catch (error) {
    onError(error);
    dispatch(actions.stopCall("action"));
  }
};
