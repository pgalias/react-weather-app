import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { ForecastDetails, ForecastUnits } from '../../../../models';

describe('Forecast::Footer', () => {
  const units: ForecastUnits = {
    windSpeed: 'km/h',
    windFromDirection: 'degrees',
    airPressureAtSeaLevel: 'hPa',
    relativeHumidity: '%',
    cloudAreaFraction: '%',
  };
  const details: ForecastDetails = {
    windSpeed: 85,
    windFromDirection: 178.2,
    airPressureAtSeaLevel: 1020,
    relativeHumidity: 70,
    cloudAreaFraction: 80,
  };

  test('should render correctly', () => {
    render(<Footer units={units} forecastDetails={details} />);

    expect(screen.getByRole('footer')).toMatchSnapshot();
  });

  test('should contain all passed information', () => {
    render(<Footer units={units} forecastDetails={details} />);
  });
});
