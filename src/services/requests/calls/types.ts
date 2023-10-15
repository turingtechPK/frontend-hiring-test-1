import { Call } from '@/lib/types'

export enum CALLS_API_ENDPOINTS {
  GET_CALLS = 'calls',
  POST_NOTE = 'calls/note',
}

type ServerPayload = {
  accessToken: string
}

type Pagination = {
  pageIndex: number
  pageSize: number
}

export type GetCallsPayload = {} & Pagination & Partial<ServerPayload>

export type GetCallsResponse = {
  nodes: Call[]
  totalCount: number
  hasNextPage: boolean
}
