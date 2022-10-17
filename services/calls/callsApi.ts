import { rtkApi } from "../rtk"
import { Call, Pagination } from "./calls.interfaces"

export const callsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.query<Pagination<Call>, { offset: number; limit: number }>({
      query: (data) => ({
        document: `query Query($offset: Float, $limit: Float) {
          paginatedCalls(offset: $offset, limit: $limit) {
            nodes {
              id
              direction
              from
              to
              duration
              via
              is_archived
              call_type
              created_at
              notes {
                id
                content
              }
            }
            totalCount
            hasNextPage
          }
        }`,
        variables: data,
      }),
      providesTags: (response, data, query) => [
        { type: "call", page: (query.offset ?? query.limit) / query.limit, pageSize: query.limit },
      ],
    }),
    addNote: builder.mutation<Call, { content: string; id: string }>({
      query: (data) => ({
        document: `mutation AddNote($input: AddNoteInput!) {
          addNote(input: $input) {
            id
          }
        }`,
        variables: { input: { activityId: data.id, content: data.content } },
      }),
      invalidatesTags: [{ type: "call" }],
    }),
    archive: builder.mutation<Call, { id: Call["id"] }>({
      query: ({ id }) => ({
        document: `mutation AddNote($archiveCallId: ID!) {
          archiveCall(id: $archiveCallId) {
            id
          }
        }`,
        variables: { archiveCallId: id },
      }),
      invalidatesTags: [{ type: "call" }],
    }),
    subscription: builder.mutation<Call, void>({
      query: () => ({
        document: `subscription OnUpdatedCall {
          onUpdatedCall {
            id
            direction
            from
            to
            duration
            via
            is_archived
            call_type
            created_at
            notes {
              id
              content
            }
          }
        }`,
      }),
      invalidatesTags: (response) => [{ type: "call", id: response?.id ?? undefined }],
    }),
  }),
})

export const { useGetCallsQuery, useLazyGetCallsQuery, useAddNoteMutation, useArchiveMutation } =
  callsApi
