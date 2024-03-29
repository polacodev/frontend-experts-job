import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      name
      email
      password
      cellphone
      workarea
      status
      description
      knowledge
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($_id: ID!, $user: UserInput!) {
    updateUser(_id: $_id, user: $user) {
      name
      email
      cellphone
      workarea
      status
      description
      knowledge
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAll($search: SearchUserInput, $user: String) {
    getUsers(search: $search, user: $user) {
      _id
      name
      email
      cellphone
      workarea
      status
      description
      knowledge
      rate {
        user_id
        averageRate
      }
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

export const GET_USER_BY_STRING = gql`
  query getUserByString($token: String) {
    getUserByString(token: $token) {
      _id
      name
      email
      cellphone
      workarea
      status
      description
      knowledge
      rate {
        user_id
        averageRate
      }
    }
  }
`;

export const SUBSCRIPTION_USER_ADDED = gql`
  subscription userAdded {
    userAdded {
      _id
      name
      email
      cellphone
      workarea
      status
      description
      knowledge
    }
  }
`;
