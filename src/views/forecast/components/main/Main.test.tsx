import React from 'react';
import { render, screen } from '@testing-library/react';
import { Main } from './Main';

describe('forecast::components::Main', () => {
  test('should render passed air temperature and city info', () => {
    render(
      <Main
        airTemperature={20}
        airTemperatureUnit="celsius"
        city={{ city: 'New York City', state: 'New York', country: 'US' }}
        className="foo"
      />,
    );

    expect(screen.getByRole('main')).toMatchSnapshot();
    expect(screen.getByText(/20 °C/)).toBeInTheDocument();
    expect(screen.getByText(/New York City, New York, US/)).toBeInTheDocument();
  });
});
