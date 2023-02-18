import { createSlice } from "@reduxjs/toolkit";

const callsSlice = createSlice({
  name: "calls",
  initialState: {
    calls: [],
  },
  reducers: {
    updateCalls: (state, action) => {
      state.calls = action.payload;
    },
  },
});

export const { updateCalls } = callsSlice.actions;
export default callsSlice.reducer;
