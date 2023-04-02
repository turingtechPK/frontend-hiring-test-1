export type AuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  errors: null | String[];
};
export type NoteStateRaw = {
  id: String;
  content: String;
};
export type CallStateRaw = {
  id: String; // "unique ID of call"
  direction: String; // "inbound" or "outbound" call
  from: String; // Caller's number
  to: String; // Callee's number
  duration: Number; // Duration of a call (in seconds)
  is_archived: boolean; // boolean that indicates if the call is archived or not
  call_type: String; // The type of the call, it can be a missed, answered or voicemail.
  via: String; // Aircall number used for the call.
  created_at: String; // When the call has been made.
  notes: NoteStateRaw[]; // Notes related to a given call
};
export type CallResponse = {
  nodes: CallStateRaw[];
  totalCount: Number;
  hasNextPage: boolean;
};
export type CallState = {
  data: CallResponse;
  loading: boolean;
  errors: String[];
};
