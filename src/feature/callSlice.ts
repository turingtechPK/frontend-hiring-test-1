import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../utils/store";
import { get_call, add_note, changes_status } from "../utils/api";
import httpClient from "../utils/httpClient";

const initialState: any = {
  call: null,
  lastPage: null
};

export const fetchCalls = createAsyncThunk(
  "call/fetchCalls",
  async ({ offset, limit }: any) => {
    try {
      const { data } = await httpClient(
        `${get_call}?offset=${offset}&limit=${limit}`,
        "GET"
      );
      return data;
    } catch (err: any) {
      console.log(err)
    }
  }
);

export const addNotes = createAsyncThunk(
  "call/addNotes",
  async ({ id, content }: { id: string, content: string }) => {
    try {
      const { data } = await httpClient(
        `${add_note}/${id}/note`,
        "POST",
        { content }
      );
      return data;
    } catch (err: any) {
      console.log(err)
    }
  }
);

export const changeStatus = createAsyncThunk(
  "call/addNotes",
  async ({ id, status }: { id: string, status: string }) => {
    try {
      const { data } = await httpClient(
        `${changes_status}/${id}/${status}`,
        "PUT",
      );
      return data;
    } catch (err: any) {
      console.log(err)
    }
  }
);


export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCalls.pending, (state, action) => {
    });
    builder.addCase(fetchCalls.fulfilled, (state, action) => {
      state.call = action.payload.nodes;
      state.lastPage = action.payload.totalCount;
      state.error = null;
    });    
    builder.addCase(fetchCalls.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const selectAllCalls = (state: RootState) => state.call.call || undefined;
export const selectAllPages = (state: RootState) => state.call.lastPage || undefined;

export default callSlice.reducer;
