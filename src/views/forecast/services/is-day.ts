import inRange from 'lodash/inRange';

const DAY_START = 6;
const DAY_END = 19;

export const isDay = (date: Date): boolean => {
  const time = date.getHours();

  return inRange(time, DAY_START, DAY_END);
};
