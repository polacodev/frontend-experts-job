import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation createContact($contact: ContactInput!) {
    createContact(contact: $contact) {
      _id
      user_id
      createdBy
      name
      cellphone
    }
  }
`;

export const GET_ALL_CONTACTS_BY_USER_ID = gql`
  query getContacts($_id: ID!) {
    getContactsByUserId(_id: $_id) {
      _id
      user_id
      createdBy
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

export const DELETE_CONTACT_BY_CONTACT_ID = gql`
  mutation deleteContact($_id: ID!) {
    deleteContact(_id: $_id) {
      user_id
      createdBy
      name
      email
    }
  }
`;

export const SUBSCRIPTION_CONTACT_ADDED = gql`
  subscription contactAddedById($_id: ID!) {
    contactAddedById(_id: $_id) {
      _id
      user_id
      createdBy
      name
      email
      cellphone
      workarea
      knowledge
    }
  }
`;
