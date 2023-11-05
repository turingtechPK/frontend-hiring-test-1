import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        username
      }
    }
  }
`;
