import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

import {
  FRONTEND_PORT,
  FRONTEND_HOST,
  GRAPHQL_PATH,
  SECURITY_PROTOCOL,
} from '@env';

const wsLink = new WebSocketLink({
  uri: 'ws://192.168.100.33:4000/graphql',
  // uri: 'https://9b75472c2815.ngrok.io/graphql',
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

export default client;
