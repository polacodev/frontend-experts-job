import client from '../../service/setup';
import AUTH from './authentication.graphql';

const authentication = async (auth) => {
  try {
    const { data } = await client.query({
      variables: auth,
      query: AUTH,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default authentication;
