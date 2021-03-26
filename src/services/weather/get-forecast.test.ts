import axios from 'axios';
import { getForecast } from './get-forecast';
import { Response } from './response-mapper';
import { Forecast } from '../../models/forecast';

jest.mock('axios');

describe('getForecast', () => {
  test('should receive forecast data from the endpoint', () => {
    // Given API Endpoint response
    const response: Response = {
      properties: {
        meta: {
          units: {
            relative_humidity: '%',
            wind_speed: 'km/h',
          },
        },
        timeseries: [
          {
            time: '2021-03-23T21:00:00Z',
            data: {
              instant: {
                details: {
                  relative_humidity: 80,
                  wind_speed: 2,
                },
              },
              next_1_hour: {
                summary: {
                  symbol_code: 'cloudy',
                },
              },
            },
          },
          {
            time: '2021-03-23T22:00:00Z',
            data: {
              instant: {
                details: {
                  relative_humidity: 81,
                  wind_speed: 4,
                },
              },
              next_1_hour: {
                summary: {
                  symbol_code: 'cloudy',
                },
              },
            },
          },
        ],
      },
    };
    ((axios.get as unknown) as jest.Mock).mockResolvedValue({ data: response });

    const mappedResponse: Forecast = {
      units: {
        relativeHumidity: '%',
        windSpeed: 'km/h',
      },
      timeseries: [
        {
          time: new Date('2021-03-23T21:00:00Z'),
          details: {
            relativeHumidity: 80,
            windSpeed: 2,
          },
          symbolCode: 'cloudy',
        },
        {
          time: new Date('2021-03-23T22:00:00Z'),
          details: {
            relativeHumidity: 81,
            windSpeed: 4,
          },
          symbolCode: 'cloudy',
        },
      ],
    };

    return expect(getForecast({ latitude: 12, longitude: 54 })).resolves.toEqual(mappedResponse);
  });
});
