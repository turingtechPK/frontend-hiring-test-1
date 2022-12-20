import { gql } from "@apollo/client";

export const GET_CALLS = gql`
  query pagination($offset: Float, $limit: Float) {
    paginatedCalls(offset: $offset, limit: $limit) {
      nodes {
        id
        call_type
        direction
        duration
        from
        to
        via
        created_at
        is_archived
        notes {
          id
          content
        }
      }
    }
  }
`;
