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

// == Theme Styles ==
require('./src/styles/styles.scss');

const offlineSupportEnabled = true;
const showPromptWhenUpdateAvailable = true;
const updateAvailablePromptMessage = 'This application has been updated.\n\nReload to display the latest version?';

// Offline support - Configure the prompt to update.
const onServiceWorkerUpdateReadyFunction = (_apiCallbackContext, pluginOptions) => {
  if (offlineSupportEnabled && showPromptWhenUpdateAvailable) {
    const answer = window.confirm(updateAvailablePromptMessage);
    if (answer === true) {
      window.location.reload();
    }
  }
};

export const onServiceWorkerUpdateReady = onServiceWorkerUpdateReadyFunction;
