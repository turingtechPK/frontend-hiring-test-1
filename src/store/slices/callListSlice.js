import { createSlice } from "@reduxjs/toolkit";
import { getCallList } from "../../thunks/dashboardThunks";
import {
  REQ_STATUSES,
  FILTER_INITIAL_STATE,
  PAGE_SETTINGS,
} from "../../constants/appUtilsConstants";

const initialState = {
  nodes: [],
  totalCount: 0,
  status: REQ_STATUSES.idle,
  hasNextPage: false,
  filter: {
    filterSettings: FILTER_INITIAL_STATE,
    pageSettings: PAGE_SETTINGS,
  },
};

const callsListPending = (state) => ({
  ...state,
  status: REQ_STATUSES.loading,
});

const callsListFulfilled = (state, action) => {
  const { nodes, totalCount, hasNextPage } = action.payload;
  state.nodes = nodes;
  state.totalCount = totalCount;
  state.hasNextPage = hasNextPage;
  state.status = REQ_STATUSES.succeeded;
  state.filter = state.filter;
  return state;
};

const callsListRejected = (state) => {
  state.status = REQ_STATUSES.failed;
  return state;
};

const callsListSlice = createSlice({
  name: "callsList",
  initialState,
  reducers: {
    updatePageNumber: (state, action) => {
      const { payload } = action;
      state.filter.pageSettings.page = payload;
      return state;
    },
    updatePageSize: (state, action) => {
      const { payload } = action;
      state.filter.pageSettings.perPage = payload;
      state.filter.pageSettings.page = 1;
      return state;
    },
    updateStatus: (state, action) => {
      const { payload } = action;
      state.filter.pageSettings = PAGE_SETTINGS;
      state.filter.filterSettings.status = payload;
      return state;
    },
  },
  extraReducers: {
    [getCallList.pending]: (state) => callsListPending(state),
    [getCallList.fulfilled]: (state, action) =>
      callsListFulfilled(state, action),
    [getCallList.rejected]: (state) => callsListRejected(state),
  },
});

export const callsListSelector = (state) => state.callsList;
export const filterSelector = (state) => state.callsList.filter;
export const { updatePageNumber, updatePageSize, updateStatus } =
  callsListSlice.actions;
export default callsListSlice.reducer;
