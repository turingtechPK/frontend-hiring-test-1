export interface IMLoginUser {
  email: string;
  password: string;
}

export interface ICALLS {
  Call: {
    id: String;
    direction: String;
    from: String;
    to: String;
    duration: number;
    via: String;
    is_archived: Boolean;
    call_type: String;
    created_at: String;
  }[];
}
