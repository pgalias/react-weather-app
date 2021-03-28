import { renderHook } from '@testing-library/react-hooks';
import { useForecast } from './useForecast';
import { Location, Forecast, City } from '../../models';
import {
  LocalizationException,
  LocalizationExceptionType,
} from '../../services/location/exceptions';
import { getLocation } from '../../services/location';
import { getForecast } from '../../services/weather';
import { getCity } from '../../services/city';
import { WeatherException, WeatherExceptionType } from '../../services/weather/exceptions';

jest.mock('../../services/location', () => ({
  getLocation: jest.fn(),
}));

jest.mock('../../services/weather', () => ({
  getForecast: jest.fn(),
}));

jest.mock('../../services/city', () => ({
  getCity: jest.fn(),
}));

describe('useForecast', () => {
  const location: Location = { latitude: 12, longitude: 65 };
  const forecast: Forecast = {
    units: { windSpeed: 'm/s' },
    current: {
      symbolCode: 'cloudy',
      time: new Date('2021-03-23T21:00:00Z'),
      details: { windSpeed: 21 },
    },
  };
  const city: City = {
    city: 'New York City',
    country: 'United States',
    state: 'New York',
  };

  test('should inform about loading information before resolved data', () => {
    global.console.error = jest.fn(() => ''); // surpassing act warning because cannot fix it
    const { result } = renderHook(() => useForecast());

    expect(result.current).toEqual([true, undefined, undefined, undefined]);
    (global.console.error as jest.Mock).mockRestore();
  });

  test('should return forecast and city data when promises resolved', async () => {
    (getLocation as jest.Mock).mockResolvedValue(location);
    (getForecast as jest.Mock).mockResolvedValue(forecast);
    (getCity as jest.Mock).mockReturnValue(city);

    const { result, waitForNextUpdate } = renderHook(() => useForecast());

    await waitForNextUpdate();

    expect(result.current).toEqual([false, forecast, city, undefined]);
  });

  test('should return error when cannot resolve localization', async () => {
    (getLocation as jest.Mock).mockRejectedValue(LocalizationException.cannotResolveLocalization());

    const { result, waitForNextUpdate } = renderHook(() => useForecast());

    await waitForNextUpdate();

    expect(result.current).toEqual([
      false,
      undefined,
      undefined,
      LocalizationExceptionType.CANNOT_RESOLVE_LOCALIZATION,
    ]);
  });

  test('should return error when cannot resolve forecast', async () => {
    (getLocation as jest.Mock).mockResolvedValue(location);
    (getForecast as jest.Mock).mockRejectedValue(WeatherException.unknownError());

    const { result, waitForNextUpdate } = renderHook(() => useForecast());

    await waitForNextUpdate();

    expect(result.current).toEqual([
      false,
      undefined,
      undefined,
      WeatherExceptionType.UNKNOWN_ERROR,
    ]);
  });
});
