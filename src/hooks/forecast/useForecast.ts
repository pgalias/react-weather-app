import { useEffect, useState } from 'react';
import { City, Forecast } from '../../models';
import { getLocation } from '../../services/location';
import { getForecast } from '../../services/weather';
import { getCity } from '../../services/city';
import {
  LocalizationException,
  LocalizationExceptionType,
} from '../../services/location/exceptions';
import { WeatherException, WeatherExceptionType } from '../../services/weather/exceptions';

type Error = LocalizationExceptionType | WeatherExceptionType;
type ReturnType = [boolean, Forecast?, City?, Error?];

export const useForecast = (): ReturnType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [forecast, setForecast] = useState<Forecast>();
  const [city, setCity] = useState<City>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const receivedLocation = await getLocation();
        const [receivedForecast, receivedCity] = await Promise.all([
          getForecast(receivedLocation),
          getCity(receivedLocation),
        ]);

        setForecast(receivedForecast);
        setCity(receivedCity);
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

  return [loading, forecast, city, error];
};
