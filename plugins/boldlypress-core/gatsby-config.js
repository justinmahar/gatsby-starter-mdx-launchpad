/** Site metadata configuration */
module.exports = (themeOptions) => {
  const reactHelmetOptions = themeOptions.reactHelmetOptions ? themeOptions.reactHelmetOptions : {};
  const sitemapOptions = themeOptions.sitemapOptions ? themeOptions.sitemapOptions : {};
  const robotsTxtOptions = themeOptions.robotsTxtOptions ? themeOptions.robotsTxtOptions : {};
  const typescriptOptions = themeOptions.typescriptOptions ? themeOptions.typescriptOptions : {};
  const sassOptions = themeOptions.sassOptions ? themeOptions.sassOptions : {};
  const netlifyCmsOptions = themeOptions.netlifyCmsOptions ? themeOptions.netlifyCmsOptions : {};
  const offlineConfig = themeOptions.offlineConfig;
  const manifestOptions = offlineConfig ? (offlineConfig.manifestOptions ? offlineConfig.manifestOptions : {}) : {};
  const offlineOptions = offlineConfig ? (offlineConfig.offlineOptions ? offlineConfig.offlineOptions : {}) : {};
  const reportingConfig = themeOptions.reportingConfig;
  const googleAnalyticsOptions = reportingConfig
    ? reportingConfig.googleAnalytics.googleAnalyticsOptions
      ? reportingConfig.googleAnalytics.googleAnalyticsOptions
      : {}
    : {};
  const imageOptions = themeOptions.imageOptions ? themeOptions.imageOptions : {};

  const pagesPath = themeOptions.pagesPath;
  const settingsPath = themeOptions.settingsPath;

  // Fix path to icon:
  // Gatsby serves content in static without "static" in the path, but here
  // the path must be relative to the project root. So we add in static before the path.
  if (manifestOptions.icon) {
    manifestOptions.icon = 'static' + (manifestOptions.icon.startsWith('/') ? '' : '/') + manifestOptions.icon;
  }

  const imagesPlugins = [];
  if (Array.isArray(imageOptions.imagesPaths)) {
    for (let i = 0; i < imageOptions.imagesPaths.length; i++) {
      const imagesPath = imageOptions.imagesPaths[i];
      imagesPlugins.push({
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: imagesPath,
        },
      });
    }
  }

  const plugins = [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        // Use our settings configuration:
        ...manifestOptions,
        // Add/override additional options here
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        ...offlineOptions,
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
      options: {
        ...reactHelmetOptions,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/u/*`],
        ...sitemapOptions,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        ...robotsTxtOptions,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        ...typescriptOptions,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        ...sassOptions,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/admin/cms.js`,
        manualInit: true,
        ...netlifyCmsOptions,
      },
    },
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
        path: pagesPath,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `yml-settings`,
        path: settingsPath,
      },
    },
    ...imagesPlugins,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
        ...googleAnalyticsOptions,
      },
    });
  }
  // == End Analytics ==

  return {
    plugins: plugins,
  };
};
