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
        notes {
          id
          content
        }
      }
    }
  }
`
