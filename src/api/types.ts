export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    username: string;
    id: string;
  };
};

type Note = {
  id: string;
  content: string;
};

export type CallType = 'missed' | 'voicemail' | 'answered';

export type Call = {
  id: string;
  direction: string;
  from: string;
  to: string;
  duration: number;
  is_archived: Boolean;
  call_type: CallType;
  via: string;
  created_at: string;
  notes: Note[];
};

export type CallsResponse = {
  nodes: Call[];
  totalCount: number;
  hasNextPage: Boolean;
};
