import React, { FunctionComponent } from 'react';
import { ForecastDetails, ForecastUnits } from '../../../../models';
import styles from './footer.module.css';
import { Info } from '../info/Info';
import { WindIcon } from '../wind-icon/WindIcon';

type Props = {
  units: ForecastUnits;
  forecastDetails: ForecastDetails;
};

export const Footer: FunctionComponent<Props> = ({ units, forecastDetails }) => (
  <footer className={styles.footer} role="list">
    <Info
      label="Pressure"
      value={forecastDetails.airPressureAtSeaLevel as number}
      unit={units.airPressureAtSeaLevel as string}
    />
    <Info
      label="Humidity"
      value={forecastDetails.relativeHumidity as number}
      unit={units.relativeHumidity as string}
    />
    <Info
      label="Cloudiness"
      value={forecastDetails.cloudAreaFraction as number}
      unit={units.cloudAreaFraction as string}
    />
    <Info
      label="Wind speed"
      value={forecastDetails.windSpeed as number}
      unit={units.cloudAreaFraction as string}
      icon={<WindIcon windFromDirection={forecastDetails.windFromDirection as number} />}
    />
  </footer>
);
