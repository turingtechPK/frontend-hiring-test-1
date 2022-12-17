export interface Call {
    id: string
    direction: String
    from: String
    to: String
    duration: number
    is_archived: Boolean
    call_type: String
    via: String
    created_at: String
    notes: []
}