import React from 'react';
import { render, screen } from '@testing-library/react';
import { Forecast } from './Forecast';
import { useForecast } from '../../hooks/forecast/useForecast';
import { isDay } from './services/is-day';

jest.mock('react-animated-weather', () => () => <span>loading icon</span>);

jest.mock('../../hooks/forecast/useForecast', () => ({
  useForecast: jest.fn(),
}));

jest.mock('./services/is-day', () => ({
  isDay: jest.fn(),
}));

describe('Forecast', () => {
  test('should render loader when forecast data are fetching', () => {
    (useForecast as jest.Mock).mockReturnValue([true, undefined, undefined, undefined]);

    render(<Forecast />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('should render error when forecast data throws an exception', () => {
    (useForecast as jest.Mock).mockReturnValue([false, undefined, undefined, 'unknown_error']);
    render(<Forecast />);

    expect(
      screen.getByText(/Something goes wrong. Please try again in a minute./),
    ).toBeInTheDocument();
  });

  test.todo('should render forecast information after data fetching');
});
