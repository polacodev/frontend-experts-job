import { gql } from '@apollo/client';

export const CREATE_STATUS = gql`
  mutation addNotification($notification: NotificationInput!) {
    addNotification(notification: $notification) {
      _id
      user_id
      createdBy
      message
      name
      email
      cellphone
      workarea
      knowledge
    }
  }
`;

export const GET_ALL_STATUS_BY_USER_ID = gql`
  query getStatus($_id: ID!) {
    getNotificationsByUserId(_id: $_id) {
      _id
      user_id
      createdBy
      message
      name
      email
      cellphone
      workarea
      knowledge
    }
  }
`;

export const DELETE_STATUS_BY_CONTACT_ID = gql`
  mutation deleteContact($_id: ID!) {
    deleteContact(_id: $_id) {
      user_id
      createdBy
      name
      email
    }
  }
`;
