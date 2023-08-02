// graphql.js
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { BASE_URL } from '@/config/app';

// Create Apollo client
const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

// Function to make GraphQL requests with the authenticated token
export const makeGraphQLRequest = async (query, variables, headers = {}, isMutation = false) => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    console.error('Authentication token not found.');
    return null;
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