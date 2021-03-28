import React, { FunctionComponent } from 'react';
import { City } from '../../../../models';

import styles from './main.module.css';

type Props = {
  airTemperature: number;
  airTemperatureUnit: string;
  city: City;
  className: string;
};

export const Main: FunctionComponent<Props> = ({
  airTemperature,
  airTemperatureUnit,
  city,
  className,
}) => {
  const unit = airTemperatureUnit[0];

  return (
    <main className={`${styles.main} ${className}`}>
      <p className={styles.temperature}>
        {airTemperature} °{unit.toUpperCase()}
      </p>
      <p className={styles.city}>
        {city.city}, {city.state}, {city.country}
      </p>
    </main>
  );
};
