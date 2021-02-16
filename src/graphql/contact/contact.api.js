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
    return data;
  } catch (error) {
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
    return { data, loading };
  } catch (error) {
    console.log(error.message);
  }
};
