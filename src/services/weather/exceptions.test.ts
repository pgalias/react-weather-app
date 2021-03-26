import { WeatherException, WeatherExceptionType } from './exceptions';

describe('WeatherException', () => {
  test('should be able to create an error instance by constructor', () => {
    const error = new WeatherException(WeatherExceptionType.INTERNAL_SERVER_ERROR, 'some message');

    expect(error).toBeInstanceOf(WeatherException);
    expect(error).toBeInstanceOf(Error);
    expect(error.type).toBe(WeatherExceptionType.INTERNAL_SERVER_ERROR);
    expect(error.message).toBe('some message');
  });

  test('should be able to create INCORRECT_DATA error instance directly by static method', () => {
    const error = WeatherException.incorrectData('foo');

    expect(error).toBeInstanceOf(WeatherException);
    expect(error).toBeInstanceOf(Error);
    expect(error.type).toBe(WeatherExceptionType.INCORRECT_DATA);
    expect(error.message).toBe('foo');
  });

  test('should be able to create INTERNAL_SERVER_ERROR error instance directly by static method', () => {
    const error = WeatherException.internalServerError('bar');

    expect(error).toBeInstanceOf(WeatherException);
    expect(error).toBeInstanceOf(Error);
    expect(error.type).toBe(WeatherExceptionType.INTERNAL_SERVER_ERROR);
    expect(error.message).toBe('bar');
  });

  test('should be able to create UNKNOWN_ERROR error instance directly by static method', () => {
    const error = WeatherException.unknownError('baz');

    expect(error).toBeInstanceOf(WeatherException);
    expect(error).toBeInstanceOf(Error);
    expect(error.type).toBe(WeatherExceptionType.UNKNOWN_ERROR);
    expect(error.message).toBe('baz');
  });
});
