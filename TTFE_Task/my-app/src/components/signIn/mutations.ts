import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      access_token
    }
  }
`;
