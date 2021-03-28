import React, { FunctionComponent } from 'react';
import { useForecast } from '../../hooks/forecast/useForecast';
import { Loader } from '../../components/loader';
import { ErrorCreator } from './components/error/ErrorCreator';
import styles from './forecast.module.css';
import { Info } from './components/info/Info';

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
          <footer className={styles.footer}>
            <Info
              label="Pressure"
              value={forecast.current.details.airPressureAtSeaLevel as number}
              unit={forecast.units.airPressureAtSeaLevel as string}
            />
            <Info
              label="Humidity"
              value={forecast.current.details.relativeHumidity as number}
              unit={forecast.units.relativeHumidity as string}
            />
            <Info
              label="Cloudiness"
              value={forecast.current.details.cloudAreaFraction as number}
              unit={forecast.units.cloudAreaFraction as string}
            />
            <span>
              Wind Speed: {forecast.current.details.windSpeed} {forecast.units.windSpeed}
            </span>
            <span>
              Wind Direction: {forecast.current.details.windFromDirection}{' '}
              {forecast.units.windFromDirection}
            </span>
          </footer>
        </>
      )}
    </div>
  );
};
