import React from 'react';
import { navigate } from '@reach/router';
import { useSettings } from '../settings/useSettings';

/**
 * Checks if a redirect is configured for the provided pathname, and redirects.
 *
 * Does nothing otherwise.
 *
 * Returns true when finished, indicating no redirect was found.
 *
 * @param locationPathname The location pathname from reach router. This is `props.location.pathname` for the page component.
 */
export const useConfiguredRedirect = (locationPathname: string): boolean => {
  const settings = useSettings();
  const redirects = settings.data.settingsYaml.redirects
    ? settings.data.settingsYaml.redirects.reduce((prev, curr) => {
        return { ...prev, [curr.from]: [curr.to] };
      }, {})
    : {};
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
    } else {
      setReady(true);
    }
  }, [locationPathname]);

  return ready;
};
