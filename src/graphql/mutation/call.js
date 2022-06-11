import gql from 'graphql-tag';

const ARCHIVE_CALL = gql`
  mutation archiveCall($id: ID!) {
    archiveCall(id: $id){
      id
    }
  }
`;

const ADD_NOTE_TO_CALL = gql`
  mutation addNote($activityId: ID!, $content: String!) {
    addNote(input: { activityId: $activityId, content: $content }){
      id
    }
  }
`;

export {
  ARCHIVE_CALL,
  ADD_NOTE_TO_CALL
}