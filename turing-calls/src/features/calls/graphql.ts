import { gql } from 'graphql-request'

export const PAGINATED_CALLS = gql`
  query PaginatedCalls($offset: Float, $limit: Float) {
    paginatedCalls(offset: $offset, limit: $limit) {
      totalCount
      hasNextPage
      nodes {
        id
        direction
        from
        to
        duration
        via
        is_archived
        call_type
        created_at
      }
    }
  }
`

export const ADD_NOTE = gql`
  mutation AddNote($input: AddNoteInput!) {
    addNote(input: $input) {
      id
    }
  }
`
