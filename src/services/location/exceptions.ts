export enum LocalizationExceptionType {
  CANNOT_RESOLVE_LOCALIZATION = 'cannot_resolve_localization',
  OUT_TO_DATE_BROWSER = 'out_to_date_browser',
}

export class LocalizationException extends Error {
  constructor(public type: LocalizationExceptionType, message?: string) {
    super(message);
  }

  static cannotResolveLocalization(message?: string): LocalizationException {
    return new LocalizationException(
      LocalizationExceptionType.CANNOT_RESOLVE_LOCALIZATION,
      message,
    );
  }

  static outToDateBrowser(message?: string): LocalizationException {
    return new LocalizationException(LocalizationExceptionType.OUT_TO_DATE_BROWSER, message);
  }
}
