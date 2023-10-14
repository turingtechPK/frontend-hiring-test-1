import request from 'graphql-request'
import useSWR from 'swr'

import { ADD_NOTE, PAGINATED_CALLS } from './graphql.ts'
import { CallsResponse } from './types.ts'

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

const URL = 'https://frontend-test-api.aircall.dev/graphql'

export const useCalls = (offset: number, limit: number) => {
  const { data, error, isLoading } = useSWR(
    { url: URL, offset, limit },
    fetcher
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

  return {
    data,
    isLoading,
    error,
    addNoteToCall,
  }
}
