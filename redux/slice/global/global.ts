import { createSlice } from "@reduxjs/toolkit"

import { GlobalStore } from "./Global.interface"

const initialState: GlobalStore = {}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
})

// export const {} = globalSlice.actions
export default globalSlice.reducer
