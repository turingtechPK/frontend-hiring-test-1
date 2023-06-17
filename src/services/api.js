import { gql } from "@apollo/client";

// queries retrieve 
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


// mutations  create update

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
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

export const ARCHIVE_CALL_MUTATION = gql`
  mutation ArchiveCall($id: ID!) {
    archiveCall(id: $id) {
      id
    }
  }
`;

export const ADD_NOTE_MUTATION = gql`
  mutation AddNote($activityId: ID!, $content: String!) {
    addNote(input: { activityId: $activityId, content: $content }) {
      id
      notes {
        id
        content
      }
    }
  }
`;

