import { stringifyWindDirection } from './stringify-wind-direction';

describe('Forecast::services::stringifyWindDirection', () => {
  describe.each([
    ['north', 0, 44.9, -358],
    ['north east', 45, 89.9, -314],
    ['east', 90, 134.9, -269],
    ['south east', 135, 179.9, -224],
    ['south', 180, 224.9, -179],
    ['south west', 225, 269.9, -134],
    ['west', 270, 314.9, -89],
    ['north west', 315, 359.9, -44],
  ])('%s', (direction, degFrom, degTo, negativeDeg) => {
    test(`should return ${direction} for ${degFrom}`, () => {
      expect(stringifyWindDirection(degFrom)).toBe(direction);
    });

    test(`should return ${direction} for ${degTo}`, () => {
      expect(stringifyWindDirection(degTo)).toBe(direction);
    });

    test(`should not return ${direction} for ${degTo + 1}`, () => {
      expect(stringifyWindDirection(degTo + 1)).not.toBe(direction);
    });

    test(`should return ${direction} for ${degFrom} + 360^n or ${degTo} + 360^n`, () => {
      expect(stringifyWindDirection(degFrom + 360)).toBe(direction);
      expect(stringifyWindDirection(degFrom + 720)).toBe(direction);
      expect(stringifyWindDirection(degTo + 360)).toBe(direction);
      expect(stringifyWindDirection(degTo + 720)).toBe(direction);
    });

    test(`should return ${direction} for ${negativeDeg}`, () => {
      expect(stringifyWindDirection(negativeDeg)).toBe(direction);
    });
  });
});
