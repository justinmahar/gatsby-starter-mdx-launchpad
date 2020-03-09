import * as React from 'react';

export const useDelayEffect = (
  shouldRun: boolean,
  delayInMillis: number,
  restartTrigger: null | string | number | boolean,
  callback: () => void
): void => {
  React.useEffect(() => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    if (shouldRun) {
      timeout = setTimeout(() => callback(), delayInMillis);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [shouldRun, delayInMillis, restartTrigger, callback]);
};
