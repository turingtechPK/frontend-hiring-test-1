import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CallState, CallStateRaw, CallResponse } from "../../types";

const initialState: CallState = {
  data: {
    nodes:[],
    totalCount: 0,
    hasNextPage: false,
  },
  loading: false,
  errors: [],
};

const callSlice = createSlice({
  name: "calls",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCalls: (state, action: PayloadAction<CallResponse>) => {
      state.data= action.payload;
    },
    // setCalls: (state, action: PayloadAction<CallResponse[]>) => {
    //   state.data = produce(state.data, draftState => {
    //     draftState.nodes = action.payload.map(call => call.nodes);
    //     draftState.totalCount = action.payload[0].totalCount;
    //     draftState.hasNextPage = action.payload[0].hasNextPage;
    //   });
    // },
    setErrors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
    addNote: (state) => {
      state.loading = false;
    },
    // addNote: (state, action: PayloadAction<{ id: string; note: string }>) => {
    //   const call = state.data.find((call) => call.id === action.payload.id);
    //   if (call) {
    //     call.notes.push(action.payload.note);
    //   }
    // }
  },
});

export const { setLoading, setCalls, setErrors, addNote } = callSlice.actions;

export default callSlice.reducer;
