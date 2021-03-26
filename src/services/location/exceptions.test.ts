import { LocalizationException, LocalizationExceptionType } from './exceptions';

describe('LocationException', () => {
  test('should be able to create an error instance by constructor', () => {
    const error = new LocalizationException(
      LocalizationExceptionType.CANNOT_RESOLVE_LOCALIZATION,
      'some message',
    );

    expect(error).toBeInstanceOf(LocalizationException);
    expect(error).toBeInstanceOf(Error);
    expect(error.type).toBe(LocalizationExceptionType.CANNOT_RESOLVE_LOCALIZATION);
    expect(error.message).toBe('some message');
  });

  test('should be able to create CANNOT_RESOLVE_LOCALIZATION error instance directly by static method', () => {
    const error = LocalizationException.cannotResolveLocalization('msg');

    expect(error).toBeInstanceOf(LocalizationException);
    expect(error).toBeInstanceOf(Error);
    expect(error.type).toBe(LocalizationExceptionType.CANNOT_RESOLVE_LOCALIZATION);
    expect(error.message).toBe('msg');
  });

  test('should be able to create OUT_TO_DATE_BROWSER error instance directly by static method', () => {
    const error = LocalizationException.outToDateBrowser('message');

    expect(error).toBeInstanceOf(LocalizationException);
    expect(error).toBeInstanceOf(Error);
    expect(error.type).toBe(LocalizationExceptionType.OUT_TO_DATE_BROWSER);
    expect(error.message).toBe('message');
  });
});
