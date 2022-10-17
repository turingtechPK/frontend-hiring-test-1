export interface Note {
  id: string // "0c649c34-865e-4330-9689-5e4061bf1df2"
  content: string // "Ut soluta natus sed iure."
}

export interface Call {
  id: string // "31aeb9f6-48b8-481f-8253-3b7352b8e351"
  duration: number // 89950
  is_archived: boolean // true
  from: string // "+33173968158"
  to: string // "+33157898543"
  direction: string // "outbound"
  call_type: "missed" | "answered" | "voicemail" // "answered"
  via: string // "+33140208393"
  created_at: string // "2022-10-13T01:25:06.234Z"
  notes: Note[]
}

export interface Pagination<T> {
  nodes: T[]
  totalCount: number // 73
  hasNextPage: boolean // true
}
