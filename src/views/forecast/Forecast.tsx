import React, { FunctionComponent } from 'react';
import { useForecast } from '../../hooks/forecast/useForecast';
import { Loader } from '../../components/loader';
import { ErrorCreator } from './components/error/ErrorCreator';
import { Footer } from './components/footer/Footer';
import styles from './forecast.module.css';

export const Forecast: FunctionComponent = () => {
  const [loading, forecast, location, error] = useForecast();

  return (
    <div className={styles.forecast}>
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
