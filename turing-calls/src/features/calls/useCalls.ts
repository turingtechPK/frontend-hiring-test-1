import request from 'graphql-request'
import useSWR from 'swr'

import { ADD_NOTE, ARCHIVE_CALL, PAGINATED_CALLS } from './graphql.ts'
import { ArchiveCallResponse, CallsResponse } from './types.ts'

const fetcher = ({
  url,
  limit,
  offset,
}: {
  url: string
  limit: number
  offset: number
}) =>
  request<CallsResponse>(
    url,
    PAGINATED_CALLS,
    { limit, offset },
    { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` }
  )

const archiveCall = (id: string) =>
  request<ArchiveCallResponse>(
    URL,
    ARCHIVE_CALL,
    { id },
    { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` }
  )

const URL = 'https://frontend-test-api.aircall.dev/graphql'

export const useCalls = (offset: number, limit: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    { url: URL, offset, limit },
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const addNoteToCall = async (id: string, note: string) => {
    await request(
      URL,
      ADD_NOTE,
      {
        input: { activityId: id, content: note },
      },
      { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` }
    )
  }

  const toggleArchiveStatus = async (id: string) => {
    const updatedCalls: CallsResponse = {
      ...data,
      paginatedCalls: {
        ...data!.paginatedCalls,
        nodes: data!.paginatedCalls.nodes.map(n => {
          return n.id === id ? { ...n, is_archived: !n.is_archived } : n
        }),
      },
    }

    const options = {
      optimisticData: updatedCalls,
    }

    await mutate(
      archiveCall(id).then(() => updatedCalls),
      options
    )
  }

  return {
    data,
    isLoading,
    error,
    addNoteToCall,
    toggleArchiveStatus,
  }
}
