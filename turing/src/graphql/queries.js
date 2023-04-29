import { gql } from '@apollo/client';

export const PAGINATED_CALLS_QUERY = gql`
  query PaginatedCalls($offset: Float, $limit: Float) {
    paginatedCalls(offset: $offset, limit: $limit) {
      nodes {
        id
        direction
        from
        to
        duration
        is_archived
        call_type
        via
        created_at
        notes {
          id
          content
        }
      }
      totalCount
    }
  }
`;

export const CALL_QUERY = gql`
  query CallQuery($id: ID!) {
    call(id: $id) {
      id
      direction
      from
      to
      duration
      is_archived
      call_type
      via
      created_at
      notes {
        id
        content
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
