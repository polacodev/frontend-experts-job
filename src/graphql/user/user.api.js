import client from '../../service/setup';
import { GET_ALL_USERS, DELETE_USER } from './user.graphql';

export const getAllUsers = async () => {
  try {
    const { data, loading } = await client.query({
      query: GET_ALL_USERS,
    });
    return { data, loading };
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await client.mutate({
      variables: id,
      mutation: DELETE_USER,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
