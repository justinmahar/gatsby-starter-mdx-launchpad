import { useEffect } from 'react';

/**
 * Creates an effect that retrieves the `Position` from the browser though the `navigator.geolocation` interface,
 * if available (`shouldRetrieve` must be true).
 * Provide success and error callbacks to receive the position data or an error (e.g. user denies geolocation API access).
 * On success/error callbacks, you should set the shouldRetrieve boolean state to false.
 *
 * @param shouldRetrieve True to retrieve geolocation. False otherwise.
 * @param successCallback The callback on success. Takes a `Position` as the only argument.
 * @param errorCallback The callback on error. Takes a `PositionError` as the only argument.
 * @param options A `PositionOptions` to use when retrieving the position.
 *
 * @returns True if the browser supports `navigator.geolocation`, false otherwise.
 */
export const useNavigatorGeolocationEffect = (
  shouldRetrieve: boolean,
  successCallback: PositionCallback = () => {},
  errorCallback: PositionErrorCallback = () => {},
  options: PositionOptions | undefined = {}
): boolean => {
  const supported: boolean = !!navigator && !!navigator.geolocation && !!navigator.geolocation.getCurrentPosition;

  useEffect(() => {
    let aborted = false;

    const safeSuccessCallback: PositionCallback = (position: Position) => {
      if (!aborted && shouldRetrieve) {
        successCallback(position);
      }
    };

    const safeErrorCallback: PositionErrorCallback = (positionError: PositionError) => {
      if (!aborted && shouldRetrieve) {
        errorCallback(positionError);
      }
    };

    if (supported && shouldRetrieve) {
      navigator.geolocation.getCurrentPosition(safeSuccessCallback, safeErrorCallback, options);
    }

    return () => {
      // Cleanup. Setting aborted to true will prevent the provided callbacks from firing.
      aborted = true;
    };
  }, [shouldRetrieve, successCallback, errorCallback, options, supported]);

  return supported;
};
