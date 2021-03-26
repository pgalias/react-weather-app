import axios from 'axios';
import { getForecast } from './get-forecast';
import { Response } from './response-mapper';
import { Forecast } from '../../models/forecast';
import { WeatherException } from './exceptions';
import { Location } from '../../models';

jest.mock('axios');

describe('getForecast', () => {
  const location: Location = { latitude: 12, longitude: 54 };

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

    return expect(getForecast(location)).resolves.toEqual(mappedResponse);
  });

  describe('error handling', () => {
    test('should throw internal server error when server error occurred', () => {
      ((axios.get as unknown) as jest.Mock).mockRejectedValue({ response: { status: 500 } });

      return expect(getForecast(location)).rejects.toThrowError(
        WeatherException.internalServerError(),
      );
    });

    test('should throw incorrect data error when passed data is incorrect', () => {
      ((axios.get as unknown) as jest.Mock).mockRejectedValue({
        response: { status: 400, data: 'incorrect data passed' },
      });

      return expect(getForecast(location)).rejects.toThrowError(
        WeatherException.incorrectData('incorrect data passed'),
      );
    });

    test('should throw unknown error when status is other than 400+ and 500+', () => {
      ((axios.get as unknown) as jest.Mock).mockRejectedValue({ response: {} });

      return expect(getForecast(location)).rejects.toThrowError(WeatherException.unknownError());
    });
  });
});
