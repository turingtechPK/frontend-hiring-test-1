import { gql } from 'graphql-request'

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      refresh_token
      user {
        id
        username
      }
    }
  }
`

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshTokenV2 {
    refreshTokenV2 {
      access_token
      refresh_token
      user {
        id
        username
      }
    }
  }
`
