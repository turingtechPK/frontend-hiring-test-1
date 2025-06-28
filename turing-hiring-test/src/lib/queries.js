import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        username
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshToken {
      access_token
      user {
        id
        username
      }
    }
  }
`;

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
      hasNextPage
    }
  }
`;

export const CALL_QUERY = gql`
  query Call($id: Float!) {
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

export const ARCHIVE_CALL_MUTATION = gql`
  mutation ArchiveCall($id: ID!) {
    archiveCall(id: $id) {
      id
      is_archived
    }
  }
`;

export const ADD_NOTE_MUTATION = gql`
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

export const ON_UPDATE_CALL_SUBSCRIPTION = gql`
  subscription OnUpdateCall($id: ID!) {
    onUpdateCall(id: $id) {
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
