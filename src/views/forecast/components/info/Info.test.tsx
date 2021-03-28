import React from 'react';
import { render, screen } from '@testing-library/react';
import { Info } from './Info';
import { ReactComponent as Icon } from '../../../../assets/img/down-arrow.svg';

describe('forecast::components::Info', () => {
  test('should render passed label, value and unit', () => {
    render(<Info label="foo" value={20} unit="m/s" />);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByText(/foo/i)).toBeInTheDocument();
    expect(screen.getByText(/20/i)).toBeInTheDocument();
    expect(screen.getByText(/m\/s/i)).toBeInTheDocument();
  });

  test('should render icon when its passed', () => {
    render(<Info label="bar" value={80} unit="%" icon={<Icon />} />);

    expect(screen.getByRole('listitem')).toMatchSnapshot();
  });
});
