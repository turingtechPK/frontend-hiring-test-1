import { gql } from "@apollo/client";

export const ADD_NOTE = gql`
  mutation addNote($input: AddNoteInput!) {
    addNote(input: $input) {
      id
    }
  }
`;
