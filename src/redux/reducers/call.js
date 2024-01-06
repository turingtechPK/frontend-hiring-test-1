import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  calls: null,
  call: null
};

export const callReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('GET_CALLS_REQUEST', (state) => {
      state.callLoading = true;
    })
    .addCase('GET_CALLS_SUCCESS', (state, action) => {
      state.callLoading = false;
      state.calls = action.payload;
      state.callError = null;
    })
    .addCase('GET_CALLS_FAIL', (state, action) => {
      state.callLoading = false;
      state.callError = action.payload;
      state.calls = null;
    })
    .addCase('GET_CALL_WITH_ID_REQUEST', (state) => {
      state.callIdLoading = true;
    })
    .addCase('GET_CALL_WITH_ID_SUCCESS', (state, action) => {
      state.callIdLoading = false;
      state.call = action.payload;
      state.callIdError = null;
    })
    .addCase('GET_CALL_WITH_ID_FAIL', (state, action) => {
      state.callIdLoading = false;
      state.callIdError = action.payload;
      state.call = null;
    })
    .addCase('UPDATE_CALL_NOTES_REQUEST', (state) => {
      state.notesLoading = true;
    })
    .addCase('UPDATE_CALL_NOTES_SUCCESS', (state, action) => {
      state.notesLoading = false;
      state.notesSuccess = action.payload;
      state.notesError = null;
    })
    .addCase('UPDATE_CALL_NOTES_FAIL', (state,action) => {
      state.notesLoading = false;
      state.notesSuccess = null;
      state.notesError = action.payload;
    })
    .addCase('UPDATE_CALL_STATUS_REQUEST', (state) => {
      state.statusLoading = true;
    })
    .addCase('UPDATE_CALL_STATUS_SUCCESS', (state, action) => {
      state.statusLoading = false;
      state.statusSuccess = action.payload;
      state.statusError = null;
    })
    .addCase('UPDATE_CALL_STATUS_FAIL', (state,action) => {
      state.statusLoading = false;
      state.statusSuccess = null;
      state.statusError = action.payload;
    })
    .addCase('CLEAR_ERROR', (state) => {
      state.error = null;
    });
});
