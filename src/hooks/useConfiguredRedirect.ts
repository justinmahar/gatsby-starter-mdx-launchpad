import React from 'react';
import { redirects } from '../settings/redirects';
import { navigate } from '@reach/router';

export const useConfiguredRedirect = (locationPathname: string): void => {
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
  }, [locationPathname]);
};
