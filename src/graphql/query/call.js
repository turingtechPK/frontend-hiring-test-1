import gql from "graphql-tag";

const FETCH_CALLS = gql`
  query paginatedCalls($offset: Float!, $limit: Float!) {
    paginatedCalls(offset: $offset, limit: $limit){
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
      hasNextPage
    }
  }
`;

const GET_CALL = gql`
  query activitiy($id: ID!) {
    call(id: $id){
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

export { 
  FETCH_CALLS,
  GET_CALL
};
