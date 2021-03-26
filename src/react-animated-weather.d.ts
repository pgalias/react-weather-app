declare module 'react-animated-weather' {
  import { FunctionComponent } from 'react';

  type Icon =
    | 'CLEAR_DAY'
    | 'CLEAR_NIGHT'
    | 'PARTLY_CLOUDY_DAY'
    | 'PARTLY_CLOUDY_NIGHT'
    | 'CLOUDY'
    | 'RAIN'
    | 'SLEET'
    | 'SNOW'
    | 'WIND'
    | 'FOG';

  type Props = {
    icon: Icon;
    color?: string;
    size?: number;
    animate?: boolean;
  };

  const ReactAnimatedWeather: FunctionComponent<Props>;

  export default ReactAnimatedWeather;
}
