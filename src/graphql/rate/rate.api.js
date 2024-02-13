import NotifyMessage from '../../core-components/ToastMessage/ToastMessage';
import localization from '../../localization/localization';
import client from '../../service/setup';
import { CREATE_RATE, GET_RATES_AVERAGE_BY_USER_ID } from './rate.graphql';

export const createNewRate = async (rate) => {
  try {
    const { data } = await client.mutate({
      variables: { rate },
      mutation: CREATE_RATE,
    });
    return data;
  } catch (error) {
    NotifyMessage(localization.rateAddError);
    console.log(error.message);
  }
};

export const getRatesAverageByUserId = async (_id) => {
  try {
    const { data, loading } = await client.query({
      variables: {
        _id: _id,
      },
      query: GET_RATES_AVERAGE_BY_USER_ID,
    });
    return { data, loading };
  } catch (error) {
    NotifyMessage(localization.rateAddError);
    console.log(error.message);
  }
};
