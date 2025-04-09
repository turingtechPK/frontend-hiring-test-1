import { gql } from "@apollo/client";

export const GET_PAGINATED_CALLS = gql`
  query GetPaginatedCalls($offset: Float!, $limit: Float!) {
    paginatedCalls(offset: $offset, limit: $limit) {
      nodes {
        id
        from
        to
        call_type
        direction
        duration
        is_archived
        via
        created_at
        notes {
          id
          content
        }
      }
      hasNextPage
      totalCount
    }
  }
`;

// Get a single call by id
export const GET_CALL_BY_ID = gql`
  query GetCallById($id: ID!) {
    call(id: $id) {
      id
      from
      to
      call_type
      direction
      duration
      is_archived
      via
      created_at
      notes {
        id
        content
      }
    }
  }
`;

// Query to archive a call
export const ARCHIVE_CALL = gql`
  mutation ArchiveCall($id: ID!) {
    archiveCall(id: $id) {
      id
      is_archived
    }
  }
`;

// Query for adding note
export const ADD_NOTE = gql`
  mutation AddNote($input: AddNoteInput!) {
    addNote(input: $input) {
      id
      notes {
        id
        content
      }
    }
  }
`;
