import { UnitsNames } from './units';
import { WeatherSymbols } from './weather-symbol';

export type ForecastUnits = Partial<Record<UnitsNames, string>>;
export type ForecastDetails = Partial<Record<UnitsNames, number>>;

export interface WeatherInformation {
  time: Date;
  details: ForecastDetails;
  symbolCode?: WeatherSymbols;
}

export interface Forecast {
  readonly units: ForecastUnits;
  readonly current: WeatherInformation;
}
