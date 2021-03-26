import { useEffect, useState } from 'react';
import { Forecast } from '../../models/forecast';
import { getLocation } from '../../services/location';
import { getForecast } from '../../services/weather';
import {
  LocalizationException,
  LocalizationExceptionType,
} from '../../services/location/exceptions';
import { WeatherException, WeatherExceptionType } from '../../services/weather/exceptions';
import { Location } from '../../models';

type Error = LocalizationExceptionType | WeatherExceptionType;
type ReturnType = [boolean, Forecast?, Location?, Error?];

export const useForecast = (): ReturnType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>();
  const [forecast, setForecast] = useState<Forecast>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const receivedLocation = await getLocation();
        const receivedForecast = await getForecast(receivedLocation);

        setLocation(receivedLocation);
        setForecast(receivedForecast);
      } catch (e) {
        if (e instanceof LocalizationException || e instanceof WeatherException) {
          setError(e.type);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [loading, forecast, location, error];
};
