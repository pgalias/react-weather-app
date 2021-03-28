import React, { FunctionComponent, useEffect, useState } from 'react';
import { useForecast } from '../../hooks/forecast/useForecast';
import { Loader } from '../../components/loader';
import { ErrorCreator } from './components/error/ErrorCreator';
import { Footer } from './components/footer/Footer';
import styles from './forecast.module.css';
import { isDay } from './services/is-day';

export const Forecast: FunctionComponent = () => {
  const [loading, forecast, location, error] = useForecast();

  const [background, setBackground] = useState<string>();
  useEffect(() => {
    if (forecast?.current?.time) {
      const isCurrentlyDay = isDay(forecast?.current?.time);
      setBackground(isCurrentlyDay ? styles.day : styles.night);
    }
  }, [forecast]);

  return (
    <div className={`${styles.forecast} ${background}`}>
      {loading && <Loader />}
      {error && <ErrorCreator error={error} />}
      {location && forecast && (
        <>
          <p className="text-sm">
            {location?.longitude} {location?.longitude}
          </p>
          <p className="text-2xl">
            {forecast.current.details.airTemperature} {forecast.units.airTemperature}
          </p>
          <Footer forecastDetails={forecast.current.details} units={forecast.units} />
        </>
      )}
    </div>
  );
};
