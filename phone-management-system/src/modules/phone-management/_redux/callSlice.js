import { createSlice } from "@reduxjs/toolkit";

const initialCallState = {
  nodes: [],
  selectedNode: null,
  totalCount: null,
  hasNextPage: null,
  actionLoading: false,
  listLoading: false,
};

export const callSlice = createSlice({
  name: "callInfo",
  initialState: initialCallState,
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
    getCallsInfo: (state, action) => {
      const { nodes, hasNextPage, totalCount } = action.payload;
      state.nodes = nodes;
      state.hasNextPage = hasNextPage;
      state.totalCount = totalCount;
      state.listLoading = false;
    },
    getSelectedCallInfo: (state, action) => {
      state.selectedNode = action?.payload;
      state.actionLoading = false;
    },
  },
});
