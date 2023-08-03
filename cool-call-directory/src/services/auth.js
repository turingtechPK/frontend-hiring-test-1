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
    // Store the timestamp when the token was stored
    localStorage.setItem('authTokenTimestamp', Date.now());

    return true;
  } catch (error) {
    console.error('Authentication failed:', error);
    return false;
  }
};

// Function to refresh the authentication token and update it in local storage
export const authRefresh = async () => {
  try {
    const REFRESH_TOKEN_MUTATION = gql`
      mutation {
        refreshToken{
          access_token
        }
      }
    `;
    
    const authToken = localStorage.getItem('authToken');
    
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    const response = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      context: {headers}
    });

    const newAuthToken = response.data.refreshToken.access_token;
    localStorage.setItem('authToken', newAuthToken);
    // Store the timestamp when the token was stored
    localStorage.setItem('authTokenTimestamp', Date.now());
    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};