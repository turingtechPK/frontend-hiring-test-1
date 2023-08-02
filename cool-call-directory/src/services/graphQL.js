// graphql.js
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { BASE_URL } from '@/config/app';
import {authRefresh} from './auth';

// Create Apollo client
const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

const TEN_MINUTES = 10 * 60 * 1000; // 10 minutes in milliseconds

// Function to make GraphQL requests with the authenticated token
export const makeGraphQLRequest = async (query, variables, headers = {}, isMutation = false) => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    console.error('Authentication token not found.');
    return null;
  }

  // Get the timestamp when the token was stored in local storage
  const storedTimestamp = parseInt(localStorage.getItem('authTokenTimestamp'));
  const currentTimestamp = Date.now();

  if (!storedTimestamp || currentTimestamp - storedTimestamp >= TEN_MINUTES) {
    // Token is more than 10 minutes old, refresh the token
    const isTokenRefreshed = await authRefresh(authToken);

    if (!isTokenRefreshed) {
      // Token refresh failed, do not proceed with the GraphQL request
      return null;
    }
  }

  headers = {
    ...headers,
    Authorization: `Bearer ${authToken}`,
  };

  try {
    const response = isMutation
      ? await client.mutate({
          mutation: gql`${query}`,
          variables: variables,
          context: {
            headers,
          },
        })
      : await client.query({
          query: gql`${query}`,
          variables: variables,
          context: {
            headers,
          },
        });

    return response.data;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    return null;
  }
};