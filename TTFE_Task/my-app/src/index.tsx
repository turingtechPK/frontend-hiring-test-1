import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { RecoilRoot } from "recoil";
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const httpLink = createHttpLink({
  uri: "https://frontend-test-api.aircall.io/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("Item");
  console.debug({ token });
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
