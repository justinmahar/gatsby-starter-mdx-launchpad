/** Site metadata configuration */
module.exports = themeOptions => {
  const netlifyCmsOptions = themeOptions.netlifyCmsOptions ? themeOptions.netlifyCmsOptions : {};

  return {
    plugins: [
      {
        resolve: `gatsby-plugin-netlify-cms`,
        options: {
          ...netlifyCmsOptions,
          modulePath: `${__dirname}/src/admin/cms.js`,
          manualInit: true,
        },
      },
    ],
  };
};
