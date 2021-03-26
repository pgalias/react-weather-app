import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorCreator } from './ErrorCreator';
import { LocalizationExceptionType } from '../../../../services/location/exceptions';
import { WeatherExceptionType } from '../../../../services/weather/exceptions';

describe('ErrorCreator', () => {
  test.each([
    LocalizationExceptionType.OUT_TO_DATE_BROWSER,
    LocalizationExceptionType.CANNOT_RESOLVE_LOCALIZATION,
    WeatherExceptionType.UNKNOWN_ERROR,
    WeatherExceptionType.INCORRECT_DATA,
    WeatherExceptionType.INTERNAL_SERVER_ERROR,
  ])('should render correct message for %s error', error => {
    render(<ErrorCreator error={error} />);
    expect(screen.getByRole('alert')).toMatchSnapshot();
  });
});
