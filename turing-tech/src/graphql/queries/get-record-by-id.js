import { gql } from "@apollo/client";

export const GET_RECORD_BY_ID = gql`
  query call($id: ID!) {
    call(id: $id) {
      id
      call_type
      duration
      from
      to
      via
    }
  }
`;
