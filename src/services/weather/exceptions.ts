export enum WeatherExceptionType {
  INCORRECT_DATA = 'incorrect_data',
  INTERNAL_SERVER_ERROR = 'internal_server_error',
  UNKNOWN_ERROR = 'unknown_error',
}

export class WeatherException extends Error {
  constructor(public type: WeatherExceptionType, message?: string) {
    super(message);
  }

  static incorrectData(message?: string): WeatherException {
    return new WeatherException(WeatherExceptionType.INCORRECT_DATA, message);
  }

  static internalServerError(message?: string): WeatherException {
    return new WeatherException(WeatherExceptionType.INTERNAL_SERVER_ERROR, message);
  }

  static unknownError(message?: string): WeatherException {
    return new WeatherException(WeatherExceptionType.UNKNOWN_ERROR, message);
  }
}
