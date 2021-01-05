import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query getAll {
    getUsers {
      name
      email
      password
      cellphone
      workarea
      status
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
      name
      email
    }
  }
`;

export const SUBSCRIPTION_USER_ADDED = gql`
  subscription userAdded {
    userAdded {
      name
      email
      password
      cellphone
      workarea
      status
    }
  }
`;
