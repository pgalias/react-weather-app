import { UnitsNames } from './units';

export interface Timeserie {
  time: Date;
  details: Partial<Record<UnitsNames, number>>;
  symbolCode: string;
}

export interface Forecast {
  readonly units: Partial<Record<UnitsNames, string>>;
  readonly timeseries: Timeserie[];
}
