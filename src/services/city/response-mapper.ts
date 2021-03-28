import { AxiosResponse } from 'axios';
import { City } from '../../models';

export interface Response {
  address: {
    city: string;
    country: string;
    state: string;
  };
}

export const responseMapper = ({ data }: AxiosResponse<Response>): City => {
  const { address } = data;

  return {
    city: address.city,
    state: address.state,
    country: address.country,
  };
};
