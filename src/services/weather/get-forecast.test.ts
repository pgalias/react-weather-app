import axios from 'axios';
import { getForecast } from './get-forecast';
import { Response, Timeserie } from './response-mapper';
import { Forecast } from '../../models/forecast';
import { WeatherException } from './exceptions';
import { Location } from '../../models';

jest.mock('axios');

describe('getForecast', () => {
  const location: Location = { latitude: 12, longitude: 54 };

  const timeserie1: Timeserie = {
    time: '2021-03-23T21:00:00Z',
    data: {
      instant: {
        details: {
          relative_humidity: 80,
          wind_speed: 2,
        },
      },
      next_1_hours: {
        summary: {
          symbol_code: 'sleetshowersandthunder_day',
        },
      },
    },
  };
  const timeserie2: Timeserie = {
    time: '2021-03-23T23:00:00Z',
    data: {
      instant: {
        details: {
          relative_humidity: 82,
          wind_speed: 8,
        },
      },
    },
  };

  test.each([[[timeserie1, timeserie2]], [[timeserie2, timeserie1]]])(
    'should receive forecast data from the endpoint',
    (timeseries: Timeserie[]) => {
      // Given API Endpoint response
      const response: Response = {
        properties: {
          meta: {
            units: {
              relative_humidity: '%',
              wind_speed: 'km/h',
            },
          },
          timeseries,
        },
      };
      ((axios.get as unknown) as jest.Mock).mockResolvedValue({ data: response });

      const [first] = timeseries;

      const mappedResponse: Forecast = {
        units: {
          relativeHumidity: '%',
          windSpeed: 'km/h',
        },
        current: {
          time: new Date(first.time),
          details: {
            relativeHumidity: first.data.instant.details.relative_humidity,
            windSpeed: first.data.instant.details.wind_speed,
          },
          symbolCode: timeseries[0].data.next_1_hours?.summary?.symbol_code,
        },
      };

      return expect(getForecast(location)).resolves.toEqual(mappedResponse);
    },
  );

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
