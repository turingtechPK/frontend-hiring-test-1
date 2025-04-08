

export   interface call {
    id: string;
    from: string;
    to: string;
    duration: number;  
    created_at: string; 
    is_archived: boolean; 
    archived?: boolean;  
    call_type: string; 
    direction: string; 
    via: string; 
    status: string; 
  }

  export interface fetchCallsResponse {
    nodes: call[];
    totalCount: number;
  }