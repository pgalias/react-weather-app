import { LocalizationExceptionType } from '../../../../services/location/exceptions';
import { WeatherExceptionType } from '../../../../services/weather/exceptions';

const errors = {
  [LocalizationExceptionType.CANNOT_RESOLVE_LOCALIZATION]:
    'Your browser or system seems to be blocking geolocation fetching. Please check the necessary permissions.',
  [LocalizationExceptionType.OUT_TO_DATE_BROWSER]:
    'Your browser is stale. Please download newer one. You can find the list of compatible browsers here https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation#browser_compatibility',
  [WeatherExceptionType.INCORRECT_DATA]:
    'Passed latitude and/or longitude may be incorrect. Please check them and try again.',
  [WeatherExceptionType.INTERNAL_SERVER_ERROR]:
    'Cannot fetch forecast data now. Please try again in a minute.',
  [WeatherExceptionType.UNKNOWN_ERROR]: 'Something goes wrong. Please try again in a minute.',
};

export const errorResolver = (error: LocalizationExceptionType | WeatherExceptionType): string =>
  errors[error];
