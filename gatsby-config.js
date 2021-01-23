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
 * Some configurable settings are needed here, but they're outside Gatsby's GraphQL environment.
 * So, we'll use read-yaml to read them directly from the YAML files as JSON.
 */
const readYaml = require('read-yaml');

/** Load settings YAML */
const settings = readYaml.sync(`${__dirname}/src/settings/settings.yml`);

// Ensure there is no trailing slash on the Site URL
settings.siteMetadata.siteUrl = settings.siteMetadata.siteUrl.replace(/(.*)[/]+$/, '$1');
// Replace siteUrl template tag in siteImage
settings.siteMetadata.siteImage = settings.siteMetadata.siteImage.replace('{siteUrl}', settings.siteMetadata.siteUrl);

// == PWA Manifest Plugin Setup ==
// For more info on PWA support, see: https://gatsby.app/offline
/** These options are passed directly into the manifest plugin. */
const gatsbyPluginManifestOptions = {
  name: settings.gatsbyPluginManifestOptions.name,
  short_name: settings.gatsbyPluginManifestOptions.shortName,
  start_url: settings.gatsbyPluginManifestOptions.startUrl,
  theme_color: settings.gatsbyPluginManifestOptions.themeColor,
  background_color: settings.gatsbyPluginManifestOptions.backgroundColor,
  display: settings.gatsbyPluginManifestOptions.display,
  icon:
    settings.gatsbyPluginManifestOptions.customIcon !== 'none'
      ? settings.gatsbyPluginManifestOptions.customIcon
      : settings.siteMetadata.siteIcon,
};
// Fix path to icon:
// Gatsby serves content in static without "static" in the path, but here
// the path must be relative to the project root. So we add in static before the path.
if (gatsbyPluginManifestOptions.icon) {
  gatsbyPluginManifestOptions.icon =
    'static' + (gatsbyPluginManifestOptions.icon.startsWith('/') ? '' : '/') + gatsbyPluginManifestOptions.icon;
}
// == END PWA Manifest Plugin Setup ==

const plugins = [
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      ...gatsbyPluginManifestOptions,
    },
  },
  `gatsby-plugin-offline`,
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      exclude: [`/${settings.privatePagePathPrefix}/*`],
    },
  },
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
  `gatsby-transformer-yaml`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `yml-settings`,
      path: `${__dirname}/src/settings`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/static/media`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
];

// == Google Analytics ==
// Only add the analytics plugin if there's a tracking ID
if (settings.googleAnalyticsTrackingId !== 'none') {
  plugins.push({
    // https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: settings.googleAnalyticsTrackingId,
    },
  });
}
// == End Analytics ==

module.exports = {
  siteMetadata: {
    ...settings.siteMetadata,
  },
  plugins: plugins,
};
