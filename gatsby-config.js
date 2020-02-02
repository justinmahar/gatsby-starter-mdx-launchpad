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
const reportingConfig = require(`${__dirname}/settings/reporting/reporting-settings.json`);
/** Site metadata configuration */
const siteMetadataConfig = require(`${__dirname}/settings/site-metadata/site-metadata-settings.json`);
/** Offline/PWA configuration */
const offlineConfig = require(`${__dirname}/settings/offline/offline-settings.json`);

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

// Ensure there is no trailing slash on the Site URL
if (!!siteMetadataConfig.siteUrl && typeof siteMetadataConfig.siteUrl === 'string') {
  siteMetadataConfig.siteUrl = siteMetadataConfig.siteUrl.replace(/(.*)[/]+$/, '$1');
}

// All plugins used
const plugins = [
  {
    resolve: 'boldlypress-core',
    options: {
      pagesPath: `${__dirname}/src/pages-mdx`,
      postsPath: `${__dirname}/src/posts-mdx`,
      settingsPath: `${__dirname}/settings`,
      netlifyCmsOptions: {
        htmlTitle: `${siteMetadataConfig.siteName} Admin`,
      },
      offlineSupportEnabled: offlineConfig.offlineSupportEnabled,
      manifestOptions: gatsbyPluginManifestOptions,
    },
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
