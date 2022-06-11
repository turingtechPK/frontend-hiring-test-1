import gql from 'graphql-tag';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }){
      access_token
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation refreshToken {
    access_token
  }
`;

export {
  REFRESH_TOKEN,
  LOGIN_USER
}