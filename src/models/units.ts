export enum Units {
  airPressureAtSeaLevel = 'air_pressure_at_sea_level',
  airTemperature = 'air_temperature',
  cloudAreaFraction = 'cloud_area_fraction',
  relativeHumidity = 'relative_humidity',
  windFromDirection = 'wind_from_direction',
  windSpeed = 'wind_speed',
}

export type UnitsNames = keyof typeof Units;
