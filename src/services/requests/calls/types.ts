import { Call } from '@/lib/types'

export enum CALLS_API_ENDPOINTS {
  GET_CALLS = 'calls',
}

type ServerPayload = {
  accessToken: string
}

type Pagination = {
  offset?: number
  limit?: number
}

export type GetCallsPayload = {} & Pagination & Partial<ServerPayload>

export type GetCallsResponse = {
  nodes: Call[]
  totalCount: number
  hasNextPage: boolean
}
