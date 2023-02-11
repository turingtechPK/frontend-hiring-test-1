export interface Note {
  content: string;
  id: string;
}

export interface CallNode {
  call_type: string;
  created_at: string;
  direction: string;
  duration: number;
  from: string;
  id: string;
  is_archived: boolean;
  notes: Note[];
  to: string;
  via: string;
}

export interface CallList {
  hasNextPage: boolean;
  nodes: CallNode[];
  totalCount: number;
}

export type ListFilterOptions = "Archived" | "Unarchive" | "All";
