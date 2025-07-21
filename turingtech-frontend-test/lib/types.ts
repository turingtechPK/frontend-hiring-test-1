export interface Call {
  id: string
  direction: "inbound" | "outbound"
  from: string
  to: string
  duration: number
  is_archived: boolean
  call_type: "missed" | "answered" | "voicemail"
  via: string
  created_at: string
  notes: Note[]
}

export interface Note {
  id: string
  content: string
}

export interface PaginatedCalls {
  nodes: Call[]
  totalCount: number
  hasNextPage: boolean
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    username: string
  }
}

export interface LoginCredentials {
  username: string
  password: string
}
