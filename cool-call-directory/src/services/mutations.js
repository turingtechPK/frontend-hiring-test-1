// graphqlMutations.js
import { makeGraphQLRequest } from './graphQL';

const IS_MUTATION = true;
const HEADERS = {};

// Mutation to archive or unarchive a call by ID
export const ARCHIVE_CALL_MUTATION = `
  mutation ArchiveCall($id: ID!) {
    archiveCall(id: $id) {
      id
      is_archived
    }
  }
`;

// Mutation to add a note to a call
export const ADD_NOTE_MUTATION = `
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

// Wrapper function for archiveCall mutation
export const archiveCall = async (id) => {
  console.log('being archived', {id});
  const response = await makeGraphQLRequest(ARCHIVE_CALL_MUTATION, { id }, HEADERS , IS_MUTATION );
  return response?.archiveCall || null;
};

// Wrapper function for addNote mutation
export const addNote = async (activityId, content) => {
  const input = {
    activityId,
    content
  };
  
  const response = await makeGraphQLRequest(ADD_NOTE_MUTATION, { input }, HEADERS , IS_MUTATION);
  return response?.addNote || null;
};
