import axios from 'axios';
import { Location } from '../../models';
import { Forecast } from '../../models/forecast';
import { responseMapper } from './response-mapper';

export const API_URL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact';

export const getForecast = (location: Location): Promise<Forecast> =>
  axios
    .get(API_URL, {
      headers: {
        Accept: 'application/json',
      },
      params: {
        lat: location.latitude,
        lon: location.longitude,
      },
    })
    .then(responseMapper);
