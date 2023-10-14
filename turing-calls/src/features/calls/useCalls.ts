import useSWR from 'swr'

import { ADD_NOTE, ARCHIVE_CALL, PAGINATED_CALLS } from './graphql.ts'
import { ArchiveCallResponse, CallsResponse } from './types.ts'
import { sendGraphQlRequest } from '../../utils/http.ts'

const fetcher = ({
  limit,
  offset,
}: {
  url: string
  limit: number
  offset: number
}) => sendGraphQlRequest<CallsResponse>(PAGINATED_CALLS, { limit, offset })

const archiveCall = (id: string) =>
  sendGraphQlRequest<ArchiveCallResponse>(ARCHIVE_CALL, { id })

export const useCalls = (offset: number, limit: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    { url: URL, offset, limit },
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const addNoteToCall = async (id: string, note: string) => {
    await sendGraphQlRequest(ADD_NOTE, {
      input: { activityId: id, content: note },
    })
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
    calls: data?.paginatedCalls.nodes,
    isLoading,
    error,
    total: data?.paginatedCalls.totalCount,
    addNoteToCall,
    toggleArchiveStatus,
  }
}
