import { isDay } from './is-day';

describe('forecast::services::isDay', () => {
  test.each`
    hour  | expected
    ${0}  | ${false}
    ${5}  | ${false}
    ${6}  | ${true}
    ${12} | ${true}
    ${18} | ${true}
    ${19} | ${false}
    ${23} | ${false}
  `('should be $expected for $hour', ({ hour, expected }) => {
    const date = new Date();
    date.setHours(hour);
    expect(isDay(date)).toBe(expected);
  });
});
