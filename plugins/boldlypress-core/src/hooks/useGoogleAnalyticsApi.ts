import * as React from 'react';

export const useGoogleAnalyticsApi = (): any => {
  const [ready, setReady] = React.useState(false);
  const [gapi, setGapi] = React.useState(undefined);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isGlobalReady() && !ready) {
        setReady(true);
        setGapi(window.gapi);
      } else if (!ready) {
        if (!isGlobalReady()) {
          loadGoogleApi();
          setGapi(window.gapi);
          if (window.gapi && window.gapi.analytics && window.gapi.analytics.ready) {
            window.gapi.analytics.ready(() => {
              setReady(true);
              setGlobalReady(true);
            });
          }
        }
      }
    }
  }, [ready, setGapi]);

  return { gapi, ready };
};

const isGlobalReady = () => {
  return typeof window !== 'undefined' && !!window.gapi_has_been_loaded;
};
const setGlobalReady = (ready: boolean) => {
  if (typeof window !== 'undefined') {
    window.gapi_has_been_loaded = ready;
  }
};

// From: https://developers.google.com/analytics/devguides/reporting/embed/v1/getting-started#step-2
const loadGoogleApi = () => {
  if (typeof window !== 'undefined') {
    (function(w, d, s, g, js, fjs) {
      g = w.gapi || (w.gapi = {});
      g.analytics = {
        q: [],
        ready: function(cb) {
          this.q.push(cb);
        },
      };
      js = d.createElement(s);
      fjs = d.getElementsByTagName(s)[0];
      js.src = 'https://apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = function() {
        g.load('analytics');
      };
    })(window, document, 'script');
  }
};
