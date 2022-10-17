import { rtkApi } from "../rtk"
import { Call, Pagination } from "./calls.interfaces"

export const callsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.query<Pagination<Call>, { offset: number; limit: number }>({
      query: (data) => ({ url: "/calls", method: "get", params: data }),
      providesTags: (response, data, query) => [
        { type: "call", page: (query.offset ?? query.limit) / query.limit, pageSize: query.limit },
      ],
    }),
    addNote: builder.mutation<Call, { content: string; id: string }>({
      query: ({ id, ...data }) => ({
        url: `/calls/${id}/note`,
        method: "post",
        data,
      }),
      invalidatesTags: [{ type: "call" }],
    }),
    archive: builder.mutation<Call, { id: Call["id"] }>({
      query: ({ id }) => ({ url: `/calls/${id}/archive`, method: "put" }),
      invalidatesTags: [{ type: "call" }],
    }),
  }),
})

export const { useGetCallsQuery, useLazyGetCallsQuery, useAddNoteMutation, useArchiveMutation } =
  callsApi
