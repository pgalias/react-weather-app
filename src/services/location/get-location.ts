import { Location } from '../../models';
import { LocalizationException } from './exceptions';

export const getLocation = (): Promise<Location> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(LocalizationException.outToDateBrowser());
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => resolve({ latitude, longitude }),
      () => reject(LocalizationException.cannotResolveLocalization()),
    );
  });
