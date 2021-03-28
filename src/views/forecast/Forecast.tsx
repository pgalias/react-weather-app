import React, { FunctionComponent, useEffect, useState } from 'react';
import { useForecast } from '../../hooks/forecast/useForecast';
import { Loader } from '../../components/loader';
import { ErrorCreator } from './components/error/ErrorCreator';
import { Footer } from './components/footer/Footer';
import styles from './forecast.module.css';
import { isDay } from './services/is-day';
import { Main } from './components/main/Main';
import { City } from '../../models';

export const Forecast: FunctionComponent = () => {
  const [loading, forecast, city, error] = useForecast();

  const [isCurrentlyDay, setIsCurrentlyDay] = useState<boolean>();
  const [background, setBackground] = useState<string>();
  useEffect(() => {
    if (forecast?.current?.time) {
      const isDayNow = isDay(forecast?.current?.time);
      setIsCurrentlyDay(isDayNow);
      setBackground(isCurrentlyDay ? styles.day : styles.night);
    }
  }, [forecast, isCurrentlyDay]);

  return (
    <div className={`${styles.forecast} ${background}`}>
      {loading && (
        <div className={styles.nonForecastElement}>
          <Loader />
        </div>
      )}
      {error && (
        <div className={styles.nonForecastElement}>
          <ErrorCreator error={error} />
        </div>
      )}
      {city && forecast && (
        <>
          <Main
            className={isCurrentlyDay ? styles.dayTemp : styles.nightTemp}
            city={city as City}
            airTemperature={forecast.current.details.airTemperature as number}
            airTemperatureUnit={forecast.units.airTemperature as string}
          />
          <Footer forecastDetails={forecast.current.details} units={forecast.units} />
        </>
      )}
    </div>
  );
};
