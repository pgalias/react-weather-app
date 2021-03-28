import axios from 'axios';
import { getCity } from './get-city';
import { Response } from './response-mapper';
import { City, Location } from '../../models';

jest.mock('axios');

describe('services::getCity', () => {
  test('should receive city information by location', () => {
    const location: Location = {
      latitude: 54.4228379,
      longitude: 18.5820012,
    };

    const response: Response = {
      address: {
        city: 'Gdańsk',
        state: 'województwo pomorskie',
        country: 'Polska',
      },
    };
    ((axios.get as unknown) as jest.Mock).mockResolvedValue({ data: response });

    const expected: City = {
      city: 'Gdańsk',
      state: 'województwo pomorskie',
      country: 'Polska',
    };
    return expect(getCity(location)).resolves.toEqual(expected);
  });

  test.todo('should throw an error when invalid data passed to the endpoint');
  test.todo('should throw an error when server error occurred');
});
