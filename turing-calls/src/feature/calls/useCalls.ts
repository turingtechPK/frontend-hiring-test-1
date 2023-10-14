import request from 'graphql-request'
import useSWR from 'swr'

import { PAGINATED_CALLS } from './graphql.ts'
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

export const useCalls = (offset: number, limit: number) => {
  const { data, error, isLoading } = useSWR(
    { url: 'https://frontend-test-api.aircall.dev/graphql', offset, limit },
    fetcher
  )

  return {
    data,
    isLoading,
    error,
  }
}
