import { UnitsNames } from './units';
import { WeatherSymbols } from './weather-symbol';

export interface WeatherInformation {
  time: Date;
  details: Partial<Record<UnitsNames, number>>;
  symbolCode?: WeatherSymbols;
}

export interface Forecast {
  readonly units: Partial<Record<UnitsNames, string>>;
  readonly current: WeatherInformation;
}
