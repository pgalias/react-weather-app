import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

export const keysToCamelCase = <T>(object: Record<string, T>): Record<string, T> =>
  mapKeys(object, (_, key: string) => camelCase(key));
