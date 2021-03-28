import inRange from 'lodash/inRange';

export const stringifyWindDirection = (windDirection: number): string => {
  if (windDirection < 0) {
    return stringifyWindDirection(windDirection + 360);
  }

  switch (true) {
    case inRange(windDirection, 0, 45):
      return 'north';
    case inRange(windDirection, 45, 90):
      return 'north east';
    case inRange(windDirection, 90, 135):
      return 'east';
    case inRange(windDirection, 135, 180):
      return 'south east';
    case inRange(windDirection, 180, 225):
      return 'south';
    case inRange(windDirection, 225, 270):
      return 'south west';
    case inRange(windDirection, 270, 315):
      return 'west';
    case inRange(windDirection, 315, 360):
      return 'north west';
    default:
      return stringifyWindDirection(windDirection - 360);
  }
};
