import * as React from 'react';
import { GeocodeCallback, GeocodeResult, GeocodeJson } from './useGeocodeEffect';

export const useReverseGeocodeEffect = (
  shouldFetch: boolean,
  latitude: number | null,
  longitude: number | null,
  googleMapsApiKey: string,
  reverseGeocodeCallback: GeocodeCallback
): void => {
  React.useEffect(() => {
    let aborted = false;

    const safeCallback: GeocodeCallback = (results: GeocodeResult[] | null, error: string | null) => {
      if (!aborted && shouldFetch) {
        reverseGeocodeCallback(results, error);
      }
    };

    if (shouldFetch) {
      if (latitude !== null && longitude !== null) {
        const encodedLat = encodeURIComponent(latitude);
        const encodedLong = encodeURIComponent(longitude);
        const encodedApiKey = encodeURIComponent(googleMapsApiKey);
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodedLat},${encodedLong}&key=${encodedApiKey}`
        )
          .then((response: Response) => {
            response
              .json()
              .then((json: GeocodeJson) => {
                if (json.results && json.results.length > 0) {
                  safeCallback(json.results, null);
                } else {
                  safeCallback(null, json.error_message ? json.error_message : 'Results came back empty.');
                }
              })
              .catch(err => {
                safeCallback(null, err ? err + '' : 'Unknown error while decoding JSON.');
              });
          })
          .catch(err => {
            safeCallback(null, err ? err + '' : 'Unknown error while fetching.');
          });
      } else {
        safeCallback(null, `Latitude and/or longitude was null.`);
      }
    }

    return () => {
      aborted = true;
    };
  }, [shouldFetch, latitude, longitude, reverseGeocodeCallback, googleMapsApiKey]);
};
