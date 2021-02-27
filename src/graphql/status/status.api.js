import client from '../../service/setup';
import {
  CREATE_STATUS,
  DELETE_STATUS_BY_CONTACT_ID,
  GET_ALL_STATUS_BY_USER_ID,
} from './status.graphql';

export const createNewStatus = async (notification) => {
  try {
    const { data } = await client.mutate({
      variables: { notification },
      mutation: CREATE_STATUS,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllStatus = async (_id) => {
  try {
    const { data, loading } = await client.query({
      variables: {
        _id: _id,
      },
      query: GET_ALL_STATUS_BY_USER_ID,
    });
    return { data, loading };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStatusById = async (_id) => {
  try {
    const { data, loading } = await client.mutate({
      variables: {
        _id: _id,
      },
      mutation: DELETE_STATUS_BY_CONTACT_ID,
    });
    return { data, loading };
  } catch (error) {
    console.log(error.message);
  }
};
