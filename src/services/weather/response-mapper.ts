import { AxiosResponse } from 'axios';
import { Forecast, Units, WeatherSymbols } from '../../models';
import { keysToCamelCase } from '../../utils';

type RawUnits = typeof Units[keyof typeof Units];

type Summary = {
  symbol_code: WeatherSymbols;
};

type Details = Partial<Record<RawUnits, number>>;

export type Timeserie = {
  time: string;
  data: {
    instant: {
      details: Details;
    };
    next_1_hours?: {
      summary: Summary;
    };
  };
};

export interface Response {
  properties: {
    meta: {
      units: Partial<Record<RawUnits, string>>;
    };
    timeseries: Timeserie[];
  };
}

export const responseMapper = ({ data }: AxiosResponse<Response>): Forecast => {
  const first = data.properties.timeseries[0];
  const currentWeather = {
    time: new Date(first.time),
    details: keysToCamelCase(first.data.instant.details),
    symbolCode: first.data.next_1_hours?.summary?.symbol_code ?? undefined,
  };

  return {
    units: keysToCamelCase(data.properties.meta.units),
    current: currentWeather,
  };
};
