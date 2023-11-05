import { InMemoryCache, makeVar } from "@apollo/client";

export const setAccessToken = makeVar(null);

export const cache = new InMemoryCache({
  dataIdFromObject: (o) => (o._id ? `${o.__typename}:${o._id}` : undefined),

  typePolicies: {
    Query: {
      fields: {
        accessToken: {
          read() {
            return setAccessToken();
          },
        },
      },
    },
  },
});
