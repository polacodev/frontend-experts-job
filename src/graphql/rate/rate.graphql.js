import { gql } from '@apollo/client';

export const CREATE_RATE = gql`
  mutation CreateRate($rate: RateInput!) {
    createRate(rate: $rate) {
      _id
      user_id
      ratedBy
      name
      rate
    }
  }
`;

export const GET_RATES_AVERAGE_BY_USER_ID = gql`
  query GetRatesAverageByUserId($id: ID!) {
    getRatesAverageByUserId(_id: $id) {
      user_id
      averageRate
    }
  }
`;
