// types/calls.ts

export interface Note {
  id: string;
  content: string;
}

export interface Call {
  id: string;
  from: string;
  to: string;
  call_type: string;
  direction: string;
  duration: number;
  is_archived: boolean;
  via: string;
  created_at: string;
  notes: Note[];
}

export interface PaginatedCallsResponse {
  paginatedCalls: {
    nodes: Call[];
    hasNextPage: boolean;
    totalCount: number;
  };
}
