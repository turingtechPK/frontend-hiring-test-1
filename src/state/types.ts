export type AuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  errors: null | string[];
};
export type NoteStateRaw = {
  id: string;
  content: string;
};
export type CallStateRaw = {
  id: string; // "unique ID of call"
  direction: string; // "inbound" or "outbound" call
  from: string; // Caller's number
  to: string; // Callee's number
  duration: number; // Duration of a call (in seconds)
  is_archived: boolean; // boolean that indicates if the call is archived or not
  call_type: string; // The type of the call, it can be a missed, answered or voicemail.
  via: string; // Aircall number used for the call.
  created_at: string; // When the call has been made.
  notes: NoteStateRaw[]; // Notes related to a given call
};
export type CallResponse = {
  nodes: CallStateRaw[];
  totalCount: number;
  hasNextPage: boolean;
};
export type CallState = {
  data: CallResponse;
  loading: boolean;
  errors: string[];
};
