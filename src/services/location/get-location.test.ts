import { cloneDeep } from 'lodash';
import { getLocation } from './get-location';

describe('getLocation', () => {
  const navigator = cloneDeep(global.navigator);

  afterEach(() => {
    (global.navigator as unknown) = navigator;
  });

  test("should resolve current location's lat and lng when user allows to reach it", () => {
    (global.navigator.geolocation as unknown) = {
      getCurrentPosition: jest.fn().mockImplementationOnce(success =>
        Promise.resolve(
          success({
            coords: {
              latitude: 21.543,
              longitude: -43.535,
            },
          }),
        ),
      ),
    };

    return expect(getLocation()).resolves.toEqual({
      latitude: 21.543,
      longitude: -43.535,
    });
  });

  test('should reject when user does not allow to reach the location', () => {
    (global.navigator.geolocation as unknown) = {
      getCurrentPosition: jest.fn().mockImplementationOnce((_, fail) => Promise.reject(fail())),
    };

    return expect(getLocation()).rejects.toBeUndefined();
  });

  test('should reject when geolocation is unsupported', () => {
    (global.navigator.geolocation as unknown) = undefined;

    return expect(getLocation()).rejects.toBeUndefined();
  });
});
