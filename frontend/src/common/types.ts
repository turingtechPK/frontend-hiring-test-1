export interface ICall {
  id: string;
  direction: string;
  from: string;
  to: string;
  duration: number;
  is_archived: boolean;
  call_type: string;
  via: string;
  created_at: string;
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
}
