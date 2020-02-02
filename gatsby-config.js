/*
 * Configure your Gatsby site with this file.
 *
 * Options:
 *   - siteMetadata (object)
 *   - plugins (array)
 *   - pathPrefix (string)
 *   - polyfill (boolean)
 *   - mapping (object)
 *   - proxy (object)
 *   - developMiddleware (function)
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 *
 * Note: Reload your development server when making changes to this file.
 */

// Some gatsby-config settings live in JSON files and are thus configurable via NetlifyCMS.
// We pull in the user-configurable settings here using node's require function:
/** Reporting configuration */
const reportingConfig = require('./settings/reporting/reporting-settings.json');
/** Site metadata configuration */
const siteMetadataConfig = require('./settings/site-metadata/site-metadata-settings.json');
/** Offline/PWA configuration */
const offlineConfig = require('./settings/offline/offline-settings.json');

// == Offline Support Settings Setup ==
// Offline support configuration lives in a JSON file and is configurable through NetlifyCMS.
// For more info on offline support, see: https://gatsby.app/offline

// These options are passed directly into the plugin.
const gatsbyPluginManifestOptions = {
  name: offlineConfig.gatsbyPluginManifestOptions.name,
  short_name: offlineConfig.gatsbyPluginManifestOptions.shortName,
  start_url: offlineConfig.gatsbyPluginManifestOptions.startUrl,
  theme_color: offlineConfig.gatsbyPluginManifestOptions.themeColor,
  background_color: offlineConfig.gatsbyPluginManifestOptions.backgroundColor,
  display: offlineConfig.gatsbyPluginManifestOptions.display,
  icon: offlineConfig.gatsbyPluginManifestOptions.icon.useSiteIcon
    ? siteMetadataConfig.siteIcon
    : offlineConfig.gatsbyPluginManifestOptions.icon.customIcon,
};

// Fix path to icon:
// Gatsby serves content in static without "static" in the path, but here
// the path must be relative to this config file. So we add in static before the path.
if (gatsbyPluginManifestOptions.icon) {
  gatsbyPluginManifestOptions.icon =
    'static' + (gatsbyPluginManifestOptions.icon.startsWith('/') ? '' : '/') + gatsbyPluginManifestOptions.icon;
}
// Replace site name slugs for offline config
if (!!gatsbyPluginManifestOptions.name && typeof gatsbyPluginManifestOptions.name === 'string') {
  gatsbyPluginManifestOptions.name = gatsbyPluginManifestOptions.name.replace(
    '{siteName}',
    siteMetadataConfig.siteName
  );
}
if (!!gatsbyPluginManifestOptions.short_name && typeof gatsbyPluginManifestOptions.short_name === 'string') {
  gatsbyPluginManifestOptions.short_name = gatsbyPluginManifestOptions.short_name.replace(
    '{siteName}',
    siteMetadataConfig.siteName
  );
}

// These plugins are used to enable offline PWA features.
const offlineSupportEnabledPlugins = [
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      // Use our settings configuration:
      ...gatsbyPluginManifestOptions,
      // Add/override additional options here
    },
  },
  'gatsby-plugin-offline',
];
// These plugins are used to disable offline PWA features.
// See: https://www.gatsbyjs.org/packages/gatsby-plugin-offline/#remove
const offlineSupportDisabledPlugins = [`gatsby-plugin-remove-serviceworker`];
// Switch on/off offline support based on the current settings.
const offlineSupportPlugins = offlineConfig.offlineSupportEnabled
  ? offlineSupportEnabledPlugins
  : offlineSupportDisabledPlugins;
// == END Offline Support Settings Setup ==

// Ensure there is no trailing slash on the Site URL
if (!!siteMetadataConfig.siteUrl && typeof siteMetadataConfig.siteUrl === 'string') {
  siteMetadataConfig.siteUrl = siteMetadataConfig.siteUrl.replace(/(.*)[/]+$/, '$1');
}

// All plugins used
const plugins = [
  {
    resolve: `gatsby-plugin-netlify-cms`,
    options: {
      htmlTitle: `${siteMetadataConfig.siteName} Admin`,
      modulePath: `${__dirname}/src/admin/cms.js`,
      manualInit: true,
    },
  },
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sitemap`,
  `gatsby-plugin-robots-txt`,
  `gatsby-plugin-typescript`,
  `gatsby-plugin-sass`,
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [
        {
          // For line numbering/highlights and more, see:
          // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs
          resolve: 'gatsby-remark-prismjs',
          options: {
            classPrefix: 'language-',
            // Use this string to denote which language to use in inline code blocks.
            // Example: `js:::let finalBoss = "Bowser"`
            // The js::: part is removed and everything after it is highlighted as js.
            inlineCodeMarker: ':::',
            aliases: {},
          },
        },
      ],
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages-mdx`,
      path: `${__dirname}/src/pages-mdx`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `posts-mdx`,
      path: `${__dirname}/src/posts-mdx`,
    },
  },
  `gatsby-transformer-yaml`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `yml-settings`,
      path: `${__dirname}/settings`,
    },
  },
  `gatsby-transformer-json`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `json-settings`,
      path: `${__dirname}/settings`,
    },
  },
  // Offline support is configurable.
  ...offlineSupportPlugins,
  {
    resolve: 'boldlypress-core',
    options: {},
  },
];

// == Google Analytics ==

// Only add the analytics plugin if it's enabled
if (reportingConfig.googleAnalytics.analyticsEnabled) {
  const analyticsPluginConfig = {
    trackingId: reportingConfig.googleAnalytics.trackingId,
    anonymize: reportingConfig.googleAnalytics.anonymize,
    respectDNT: reportingConfig.googleAnalytics.respectDNT,
    head: reportingConfig.googleAnalytics.scriptInHead,
  };
  plugins.push({
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      // Use our settings from the config:
      ...analyticsPluginConfig,
      // Add/override additional settings here
    },
  });
}
// == End Analytics ==

module.exports = {
  siteMetadata: {
    // Site metadata lives in a JSON file and is configurable through NetlifyCMS.
    ...siteMetadataConfig,
    // Add additional site metadata here
  },
  plugins: plugins,
};
