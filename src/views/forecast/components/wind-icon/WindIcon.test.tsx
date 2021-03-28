import React from 'react';
import { render, screen } from '@testing-library/react';
import { WindIcon } from './WindIcon';

jest.mock('../../../../assets/img/down-arrow.svg', () => ({
  ReactComponent: () => <span>north</span>,
}));
jest.mock('../../../../assets/img/down-left-arrow.svg', () => ({
  ReactComponent: () => <span>north east</span>,
}));
jest.mock('../../../../assets/img/down-right-arrow.svg', () => ({
  ReactComponent: () => <span>north west</span>,
}));
jest.mock('../../../../assets/img/up-arrow.svg', () => ({
  ReactComponent: () => <span>south</span>,
}));
jest.mock('../../../../assets/img/up-left-arrow.svg', () => ({
  ReactComponent: () => <span>south east</span>,
}));
jest.mock('../../../../assets/img/up-right-arrow.svg', () => ({
  ReactComponent: () => <span>south west</span>,
}));
jest.mock('../../../../assets/img/right-arrow.svg', () => ({
  ReactComponent: () => <span>west</span>,
}));
jest.mock('../../../../assets/img/left-arrow.svg', () => ({
  ReactComponent: () => <span>east</span>,
}));

describe('forecast::components::WindIcon', () => {
  test.each`
    direction | expected
    ${1}      | ${'north'}
    ${46}     | ${'north east'}
    ${91}     | ${'east'}
    ${136}    | ${'south east'}
    ${181}    | ${'south'}
    ${226}    | ${'south west'}
    ${271}    | ${'west'}
    ${316}    | ${'north west'}
  `(
    'should resolve $expected arrow icon for wind direction equals to $direction',
    ({ direction, expected }) => {
      render(<WindIcon windFromDirection={direction} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
    },
  );
});
