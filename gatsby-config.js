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

/**
 * Some configurable settings are needed here, which is outside the GraphQL environment.
 * We'll use read-yaml to read them directly from the Yaml files as JSON.
 */
const readYaml = require('read-yaml');
/** Site metadata configuration */
const siteMetadataConfig = readYaml.sync(`${__dirname}/settings/site-metadata/site-metadata-settings.yml`);
/** Offline/PWA configuration */
const offlineConfig = readYaml.sync(`${__dirname}/settings/offline/offline-settings.yml`);
/** Reporting configuration */
const reportingConfig = readYaml.sync(`${__dirname}/settings/reporting/reporting-settings.yml`);

// == Offline Support Settings Setup ==
// Offline support configuration lives in a Yaml file and is configurable through NetlifyCMS.
// For more info on offline support, see: https://gatsby.app/offline

/** These options are passed directly into the manifest plugin. */
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
      settingsPath: `${__dirname}/settings`,
      netlifyCmsOptions: {
        htmlTitle: `${siteMetadataConfig.siteName} Admin`,
      },
      offlineConfig: {
        manifestOptions: gatsbyPluginManifestOptions,
      },
      reportingConfig: {
        googleAnalytics: {
          analyticsEnabled: reportingConfig.googleAnalytics.analyticsEnabled,
          trackingId: reportingConfig.googleAnalytics.trackingId,
          anonymize: reportingConfig.googleAnalytics.anonymize,
          respectDNT: reportingConfig.googleAnalytics.respectDNT,
          scriptInHead: reportingConfig.googleAnalytics.scriptInHead,
        },
      },
      // imageOptions: {
      //   imagesPaths: [`${__dirname}/static/media/image-dir`, `${__dirname}/static/media/another-image-dir`],
      // },
    },
  },
];

module.exports = {
  siteMetadata: {
    ...siteMetadataConfig,
  },
  plugins: plugins,
};
