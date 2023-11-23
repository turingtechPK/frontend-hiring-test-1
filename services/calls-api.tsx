import { baseAPI } from "@services/base-api";
import { CALLS } from "./tags";

const Tag = [CALLS];

const Calls = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllCalls: builder.query({
      query: (payload) => ({
        url: "calls",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: Tag,
    }),
    addNote: builder.mutation({
      query: (payload) => ({
        url: `calls/${payload.params.callId}/note`,
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: Tag,
    }),
    updateStatus: builder.mutation({
      query: (payload) => ({
        url: `calls/${payload.params.callId}/${payload.params.status}`,
        method: "PUT",
      }),
      invalidatesTags: Tag,
    }),
  }),
});
export const {
  useGetAllCallsQuery,
  useAddNoteMutation,
  useUpdateStatusMutation,
} = Calls;
