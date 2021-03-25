export enum Units {
  'airPressureAtSeaLevel',
  'airTemperature',
  'cloudAreaFraction',
  'relativeHumidity',
  'windFromDirection',
  'windSpeed',
}

export type UnitsNames = keyof typeof Units;
