import NotifyMessage from '../../core-components/ToastMessage/ToastMessage';
import localization from '../../localization/localization';
import client from '../../service/setup';
import {
  GET_ALL_CONTACTS_BY_USER_ID,
  CREATE_CONTACT,
  DELETE_CONTACT_BY_CONTACT_ID,
} from './contact.graphql';

export const createNewContact = async (contact) => {
  try {
    const { data } = await client.mutate({
      variables: { contact },
      mutation: CREATE_CONTACT,
    });
    NotifyMessage(localization.searchAddContactSuccess);
    return data;
  } catch (error) {
    NotifyMessage(localization.searchAddContactError);
    console.log(error.message);
  }
};

export const getAllContacts = async (_id) => {
  try {
    const { data, loading } = await client.query({
      variables: {
        _id: _id,
      },
      query: GET_ALL_CONTACTS_BY_USER_ID,
    });
    return { data, loading };
  } catch (error) {
    NotifyMessage(localization.contactsRequestError);
    console.log(error.message);
  }
};

export const deleteContactById = async (_id) => {
  try {
    const { data, loading } = await client.mutate({
      variables: {
        _id: _id,
      },
      mutation: DELETE_CONTACT_BY_CONTACT_ID,
    });
    NotifyMessage(localization.contactsDeleteSuccess);
    return { data, loading };
  } catch (error) {
    NotifyMessage(localization.contactsDeleteError);
    console.log(error.message);
  }
};
