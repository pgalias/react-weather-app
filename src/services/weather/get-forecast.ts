import axios, { AxiosError } from 'axios';
import { Forecast, Location } from '../../models';
import { responseMapper } from './response-mapper';
import { WeatherException } from './exceptions';

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
    .then(responseMapper)
    .catch((error: AxiosError) => {
      if (error.response?.status && error.response?.status >= 500) {
        throw WeatherException.internalServerError();
      }

      if (error.response?.status && error.response?.status >= 400) {
        throw WeatherException.incorrectData(error.response?.data?.toString());
      }

      throw WeatherException.unknownError();
    });
