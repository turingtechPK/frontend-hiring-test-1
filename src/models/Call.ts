import { Note } from './Note';

export type CallType = 'missed' | 'voicemail' | 'answered';

export type Call = {
  id: string;
  direction: string;
  from: string;
  to: string;
  duration: number;
  is_archived: boolean;
  call_type: CallType;
  via: string;
  created_at: string;
  notes: Note[];
};

export type CallsResponse = {
  nodes: Call[];
  totalCount: number;
  hasNextPage: boolean;
};
