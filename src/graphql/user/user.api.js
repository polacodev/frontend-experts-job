import client from '../../service/setup';
import { GET_ALL_USERS, DELETE_USER, CREATE_USER } from './user.graphql';

export const createUser = async (user) => {
  try {
    const { data } = await client.mutate({
      variables: { user },
      mutation: CREATE_USER,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllUsers = async (search, user) => {
  try {
    const { data, loading } = await client.query({
      variables: {
        search: search,
        user: user,
      },
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
