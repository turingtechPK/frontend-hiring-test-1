export interface Row {
  id: number;
  call_type: string;
  direction: string;
  duration: string;
  from: string;
  to: string;
  via: string;
  createdAt: string;
  is_archived: boolean;
}

export interface Call {
  id: number;
  call_type: string;
  direction: string;
  duration: string;
  from: string;
  to: string;
  via: string;
  createdAt: string;
  is_archived: boolean;
}

export interface PaginatedCalls {
  nodes: Call[];
  totalCount: number;
  hasNextPage: boolean;
}
