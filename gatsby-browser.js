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

// == PrismJS code syntax highlighting themes ==
// require("prismjs/themes/prism.css")
// require("prismjs/themes/prism-coy.css")
// require("prismjs/themes/prism-dark.css")
// require("prismjs/themes/prism-funky.css")
require('prismjs/themes/prism-okaidia.css');
// require("prismjs/themes/prism-solarizedlight.css")
// require("prismjs/themes/prism-tomorrow.css")
// require("prismjs/themes/prism-twilight.css")

// == Argon Design System Styles ==
require('./static/assets/vendor/nucleo/css/nucleo.css');
require('./static/assets/vendor/font-awesome/css/font-awesome.min.css');
require('./static/assets/css/argon-design-system-react.css');

// == Custom Styles ==
require('./src/styles/styles.scss');
