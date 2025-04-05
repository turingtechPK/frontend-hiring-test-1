// Call model
export interface Call {
  id: string;              // Unique ID of the call
  direction: 'inbound' | 'outbound';
  from: string;            // Caller's number
  to: string;              // Callee's number
  duration: number;        // Duration in seconds
  is_archived: boolean;    // Archive status
  call_type: 'missed' | 'answered' | 'voicemail';  // Type of call
  via: string;             // Aircall number used for the call
  created_at: string;      // Call creation timestamp
  notes: Note[];           // List of related notes
}

// Note model
export interface Note {
  id: string;
  content: string;
}

// User authentication types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
  };
}

// API response types
export interface PaginatedCallsResponse {
  nodes: Call[];
  totalCount: number;
  hasNextPage: boolean;
}

export interface CallsState {
  calls: Call[];
  totalCount: number;
  hasNextPage: boolean;
  loading: boolean;
  error: string | null;
}

export interface CallDetailsState {
  call: Call | null;
  loading: boolean;
  error: string | null;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; username: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
} 