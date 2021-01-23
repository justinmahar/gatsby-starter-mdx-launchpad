import React from 'react';
import { redirects } from '../settings/redirects';
import { navigate } from '@reach/router';

/**
 * Redirects to the configured pathname, or does nothing otherwise.
 *
 * Returns true when finished.
 *
 * @param locationPathname The location pathname from reach router. This is `props.location.pathname` for the page component.
 */
export const useConfiguredRedirect = (locationPathname: string): boolean => {
  const [ready, setReady] = React.useState(false);
  // Handle configured Redirects
  React.useEffect(() => {
    // Pathname (minus starting slash)
    const fixedPathname: string = locationPathname.replace(/^\//, '');
    let redirectPathname: string | undefined = fixedPathname;
    for (let i = 0; i < 10; i++) {
      if (!redirects[redirectPathname]) {
        break;
      }
      redirectPathname = redirects[redirectPathname];
    }
    if (fixedPathname !== redirectPathname) {
      navigate(`/${redirectPathname}`);
    }
    setReady(true);
  }, [locationPathname]);

  return ready;
};
