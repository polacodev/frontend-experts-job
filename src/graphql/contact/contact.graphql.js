import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation addContact($contact: ContactInput!) {
    addContact(contact: $contact) {
      _id
      user_id
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
      name
      email
    }
  }
`;
