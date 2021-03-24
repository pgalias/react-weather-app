import { Location } from '../../models';

export const getLocation = (): Promise<Location> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject();
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => resolve({ latitude, longitude }),
      () => reject(),
    );
  });
