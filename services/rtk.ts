import { createApi } from "@reduxjs/toolkit/query/react"

import { axiosBaseQuery } from "./api"

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["user", "call"],
  endpoints: (builder) => ({}),
})
