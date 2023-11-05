import { ApolloClient, HttpLink } from "@apollo/client";
import { cache, setAccessToken } from "./cache";

export const getAuthHeader = () => {
  const accessToken =
    JSON.parse(window.localStorage.getItem("access-token")) ?? setAccessToken();
  return {
    authorization: `Bearer ${accessToken}`,
  };
};

const httpLink = new HttpLink({
  uri: "https://frontend-test-api.aircall.dev/graphql",
  headers: getAuthHeader(),
});

export const client = new ApolloClient({
  link: httpLink,
  cache: cache,
});
