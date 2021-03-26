import { AxiosResponse } from 'axios';
import { Units } from '../../models';
import { Forecast } from '../../models/forecast';
import { keysToCamelCase } from '../../utils';

type RawUnits = typeof Units[keyof typeof Units];

type Summary = {
  symbol_code: string;
};

type Details = Partial<Record<RawUnits, number>>;

type Timeserie = {
  time: string;
  data: {
    instant: {
      details: Details;
    };
    next_1_hour: {
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

export const responseMapper = ({ data }: AxiosResponse<Response>): Forecast => ({
  units: keysToCamelCase(data.properties.meta.units),
  timeseries: data.properties.timeseries.map(timeserie => ({
    time: new Date(timeserie.time),
    details: keysToCamelCase(timeserie.data.instant.details),
    symbolCode: timeserie.data.next_1_hour.summary.symbol_code,
  })),
});
