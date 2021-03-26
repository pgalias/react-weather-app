import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

jest.mock('react-animated-weather', () => () => <span>loading icon</span>);

describe('Loader component', () => {
  test('should match snapshot', () => {
    render(<Loader />);

    expect(screen.getByRole('alert')).toMatchSnapshot();
  });
});
