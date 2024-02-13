import { gql } from '@apollo/client';

const AUTH = gql`
  query authentication($auth: AuthInput!) {
    authentication(auth: $auth) {
      isAuthenticated
      token
    }
  }
`;

export default AUTH;
