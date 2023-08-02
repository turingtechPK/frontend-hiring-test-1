// api.js
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { BASE_URL } from '@/config/app';

// Create Apollo client
const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

// Function to make an authentication call and store the received token in local storage
export const auth = async (username, password) => {
  try {
    const LOGIN_MUTATION = gql`
      mutation Login($username: String!, $password: String!) {
        login(input: { username: $username, password: $password }) {
          access_token
        }
      }
    `;

    const response = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { username, password },
    });

    const authToken = response.data.login.access_token;
    localStorage.setItem('authToken', authToken);
    return true;
  } catch (error) {
    console.error('Authentication failed:', error);
    return false;
  }
};

// Function to refresh the authentication token and update it in local storage
export const authRefresh = async (oldAuthToken) => {
  try {
    const REFRESH_TOKEN_MUTATION = gql`
      mutation RefreshToken($oldAuthToken: String!) {
        refreshToken(oldToken: $oldAuthToken) {
          access_token
        }
      }
    `;

    const response = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: { oldAuthToken },
    });

    const newAuthToken = response.data.refreshToken.access_token;
    localStorage.setItem('authToken', newAuthToken);
    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};