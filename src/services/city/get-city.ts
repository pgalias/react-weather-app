import axios from 'axios';
import { City, Location } from '../../models';
import { responseMapper } from './response-mapper';

export const API_URL = 'https://nominatim.openstreetmap.org/reverse?format=json&';

export const getCity = (location: Location): Promise<City> =>
  axios
    .get(API_URL, {
      headers: {
        Accept: 'application/json',
      },
      params: {
        format: 'json',
        lat: location.latitude,
        lon: location.longitude,
      },
    })
    .then(responseMapper);
