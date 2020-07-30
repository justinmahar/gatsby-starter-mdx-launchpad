/**
 * Configure your Gatsby Browser APIs here.
 *
 * This file is where your styles go!
 *
 * APIs:
 *   - disableCorePrefetching
 *   - onClientEntry
 *   - onInitialClientRender
 *   - onPostPrefetchPathname
 *   - onPreRouteUpdate
 *   - onPrefetchPathname
 *   - onRouteUpdate
 *   - onRouteUpdateDelayed
 *   - onServiceWorkerActive
 *   - onServiceWorkerInstalled
 *   - onServiceWorkerRedundant
 *   - onServiceWorkerUpdateFound
 *   - onServiceWorkerUpdateReady
 *   - registerServiceWorker
 *   - replaceComponentRenderer
 *   - replaceHydrateFunction
 *   - shouldUpdateScroll
 *   - wrapPageElement
 *   - wrapRootElement
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// === CSS/LESS/SASS imports ===

// == Bootstrap Base ==
require('bootstrap/dist/css/bootstrap.min.css');

// Offline support - Reload when there's an update
const onServiceWorkerUpdateReadyFunction = (_apiCallbackContext) => {
  window.location.reload();
};

export const onServiceWorkerUpdateReady = onServiceWorkerUpdateReadyFunction;
