import React from 'react';
import { render, screen } from '@testing-library/react';
import { Error } from './Error';

describe('Error', () => {
  test('should render passed message', () => {
    render(<Error message="foo" />);

    expect(screen.getByText(/foo/i)).toBeInTheDocument();
  });
});
