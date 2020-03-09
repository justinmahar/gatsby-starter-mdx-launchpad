import * as React from 'react';

export const useGeocodeEffect = (
  shouldFetch: boolean,
  address: string | null,
  googleMapsApiKey: string,
  geocodeCallback: GeocodeCallback
): void => {
  React.useEffect(() => {
    let aborted = false;

    const safeCallback: GeocodeCallback = (results: GeocodeResult[] | null, error: string | null) => {
      if (!aborted && shouldFetch) {
        geocodeCallback(results, error);
      }
    };

    if (shouldFetch) {
      if (address !== null && address.length > 0) {
        const encodedAddress = encodeURIComponent(address);
        const encodedApiKey = encodeURIComponent(googleMapsApiKey);
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${encodedApiKey}`)
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
        safeCallback(null, `Address was null.`);
      }
    }

    return () => {
      aborted = true;
    };
  }, [shouldFetch, address, googleMapsApiKey, geocodeCallback]);
};

export type GeocodeCallback = (results: GeocodeResult[] | null, error: string | null) => void;

// === === === === === === === === === === === === === ===
// Google Maps Geocode Types:
// Below we define the shape of the data we expect from
// Google, but we also assume anything could be undefined.
// This allows us to handle some API uncertainties.
// === === === === === === === === === === === === === ===

export type GeocodeJson = {
  plus_code: GeocodeResultPlusCode | undefined;
  results: GeocodeResult[] | undefined;
  error_message: string | undefined;
  status: 'OK' | 'REQUEST_DENIED' | undefined;
};

export type GeocodeResult = {
  address_components: GeocodeResultAdressComponent[] | undefined;
  formatted_address: string | undefined;
  geometry: GeocodeResultGeometry;
  place_id: string | undefined;
  plus_code: GeocodeResultPlusCode | undefined;
  types: string[] | undefined;
};

export type GeocodeResultPlusCode = {
  compound_code: string | undefined;
  global_code: string | undefined;
};

export type GeocodeResultGeometry = {
  location: GeocodeResultLatLng | undefined;
  location_type: string | undefined;
  viewport:
    | {
        northeast: GeocodeResultLatLng;
        southwest: GeocodeResultLatLng;
      }
    | undefined;
};

export type GeocodeResultLatLng = {
  lat: number | undefined;
  lng: number | undefined;
};

export type GeocodeResultAdressComponent = {
  long_name: string | undefined;
  short_name: string | undefined;
  types: string[] | undefined;
};
