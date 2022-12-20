import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
