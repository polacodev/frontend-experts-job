import { gql } from '@apollo/client';

export const CREATE_STATUS = gql`
  mutation createNotification($notification: NotificationInput!) {
    createNotification(notification: $notification) {
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

export const DELETE_STATUS_BY_ID = gql`
  mutation deleteNotification($_id: ID!) {
    deleteNotification(_id: $_id) {
      _id
      user_id
      createdBy
      message
      name
      email
    }
  }
`;

// export const SUBSCRIPTION_NOTIFICATION_ADDED = gql`
//   subscription notificationAdded {
//     notificationAdded {
//       _id
//       user_id
//       createdBy
//       name
//       email
//       cellphone
//       workarea
//       knowledge
//     }
//   }
// `;

export const SUBSCRIPTION_NOTIFICATION_ADDED_BY_ID = gql`
  subscription notificationAddedById($_id: ID!) {
    notificationAddedById(_id: $_id) {
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
