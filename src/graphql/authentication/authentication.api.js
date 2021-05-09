import NotifyMessage from '../../core-components/ToastMessage/ToastMessage';
import localization from '../../localization/localization';
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
    NotifyMessage(localization.authError);
    console.log(error.message);
  }
};

export default authentication;
