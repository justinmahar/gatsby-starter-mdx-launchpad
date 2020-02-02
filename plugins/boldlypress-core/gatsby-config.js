/** Site metadata configuration */
module.exports = themeOptions => {
  const reactHelmetOptions = themeOptions.reactHelmetOptions ? themeOptions.reactHelmetOptions : {};
  const sitemapOptions = themeOptions.sitemapOptions ? themeOptions.sitemapOptions : {};
  const robotsTxtOptions = themeOptions.robotsTxtOptions ? themeOptions.robotsTxtOptions : {};
  const typescriptOptions = themeOptions.typescriptOptions ? themeOptions.typescriptOptions : {};
  const sassOptions = themeOptions.sassOptions ? themeOptions.sassOptions : {};
  const netlifyCmsOptions = themeOptions.netlifyCmsOptions ? themeOptions.netlifyCmsOptions : {};
  const offlineSupportEnabled = !!themeOptions.offlineSupportEnabled;
  const manifestOptions = themeOptions.manifestOptions ? themeOptions.manifestOptions : {};
  const offlineOptions = themeOptions.offlineOptions ? themeOptions.offlineOptions : {};
  const removeServiceworkerOptions = themeOptions.removeServiceworkerOptions
    ? themeOptions.removeServiceworkerOptions
    : {};

  const pagesPath = themeOptions.pagesPath;
  const postsPath = themeOptions.postsPath;
  const settingsPath = themeOptions.settingsPath;

  // Fix path to icon:
  // Gatsby serves content in static without "static" in the path, but here
  // the path must be relative to the project root. So we add in static before the path.
  if (manifestOptions.icon) {
    manifestOptions.icon = 'static' + (manifestOptions.icon.startsWith('/') ? '' : '/') + manifestOptions.icon;
  }
  // These plugins are used to enable offline PWA features.
  const offlineSupportEnabledPlugins = [
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
  ];
  // These plugins are used to disable offline PWA features.
  // See: https://www.gatsbyjs.org/packages/gatsby-plugin-offline/#remove
  const offlineSupportDisabledPlugins = [
    {
      resolve: `gatsby-plugin-remove-serviceworker`,
      options: {
        ...removeServiceworkerOptions,
      },
    },
  ];
  // Switch on/off offline support based on the current settings.
  const offlineSupportPlugins = offlineSupportEnabled ? offlineSupportEnabledPlugins : offlineSupportDisabledPlugins;
  // == END Offline Support Settings Setup ==

  return {
    plugins: [
      // Offline support is configurable.
      ...offlineSupportPlugins,
      {
        resolve: `gatsby-plugin-react-helmet`,
        options: {
          ...reactHelmetOptions,
        },
      },
      {
        resolve: `gatsby-plugin-sitemap`,
        options: {
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
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `posts-mdx`,
          path: postsPath,
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
      `gatsby-transformer-json`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `json-settings`,
          path: settingsPath,
        },
      },
    ],
  };
};
