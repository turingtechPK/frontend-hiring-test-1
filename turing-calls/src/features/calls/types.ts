export type CallsResponse = {
  paginatedCalls: PaginatedCalls
}

export type PaginatedCalls = {
  totalCount: number
  hasNextPage: boolean
  nodes: Call[]
}

export type Call = {
  call_type: CallType
  created_at: Date
  direction: Direction
  duration: number
  from: string
  id: string
  is_archived: boolean
  notes: Note[]
  to: string
  via: string
}

export enum CallType {
  Answered = 'answered',
  Missed = 'missed',
  Voicemail = 'voicemail',
}

export enum Direction {
  Inbound = 'inbound',
  Outbound = 'outbound',
}

export type Note = {
  id: string
  content: string
}

export type ArchiveCallResponse = {
  archiveCall: {
    id: string
    is_archived: boolean
  }
}
