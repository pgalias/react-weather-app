import React, { FunctionComponent } from 'react';
import { LocalizationExceptionType } from '../../../../services/location/exceptions';
import { WeatherExceptionType } from '../../../../services/weather/exceptions';
import { Error } from '../../../../components/error/Error';
import { errorResolver } from './error-resolver';

type Props = {
  error: LocalizationExceptionType | WeatherExceptionType;
};

export const ErrorCreator: FunctionComponent<Props> = ({ error }) => (
  <Error message={errorResolver(error)} />
);
