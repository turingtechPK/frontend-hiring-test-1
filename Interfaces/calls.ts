import { note } from "./note";

export interface call {
  id: string;
  call_type: string;
  direction: string;
  duration: string;
  from: string;
  to: string;
  via: string;
  created_at: string;
  is_archived: boolean;
  notes?: [note];
}
