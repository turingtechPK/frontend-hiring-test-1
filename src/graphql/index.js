import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message }) => {
          if (message === "Unauthorized") {
            localStorage.removeItem('access_token');
            window.location.reload();
          }
        }
        );
    }),
    authLink.concat(httpLink),
  ]),
  cache: new InMemoryCache()
});

export default client;
