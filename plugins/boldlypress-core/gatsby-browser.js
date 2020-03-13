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
const updateAvailablePromptMessage = 'This application has been updated. Reload to display the latest version?';

// Offline support - Configure the prompt to update.
const onServiceWorkerUpdateReadyFunction = _apiCallbackContext => {
  console.log('onServiceWorkerUpdateReadyFunction');
  if (offlineSupportEnabled && showPromptWhenUpdateAvailable) {
    console.log('Showing prompt...');
    const answer = window.confirm(updateAvailablePromptMessage);
    console.log('answer:', answer);
    if (answer === true) {
      console.log('Reloading!');
      window.location.reload();
    }
  }
};

export const onServiceWorkerUpdateReady = onServiceWorkerUpdateReadyFunction;
