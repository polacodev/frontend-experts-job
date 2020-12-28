import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import {
  FRONTEND_PORT,
  FRONTEND_HOST,
  GRAPHQL_PATH,
  SECURITY_PROTOCOL,
} from '@env';

const httpLink = new HttpLink({
  uri: `${SECURITY_PROTOCOL}://${FRONTEND_HOST}:${FRONTEND_PORT}/${GRAPHQL_PATH}`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          project: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;
