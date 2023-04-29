import { gql } from '@apollo/client';

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
      is_archived
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
