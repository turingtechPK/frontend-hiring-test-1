import { gql } from "@apollo/client";

export const POST_NOTES = gql`
  mutation addNote($input: AddNoteInput!) {
    addNote(input: $input) {
      id
      duration
      direction
      created_at
      is_archived
      to
      from
      via
      call_type
      notes {
        id
        content
      }
    }
  }
`;
