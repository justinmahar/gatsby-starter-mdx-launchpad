/** Site metadata configuration */
module.exports = themeOptions => {
  const netlifyCmsOptions = themeOptions.netlifyCmsOptions;
  let htmlTitle = 'Admin';
  htmlTitle = netlifyCmsOptions && netlifyCmsOptions.htmlTitle ? netlifyCmsOptions.htmlTitle : htmlTitle;

  return {
    plugins: [
      {
        resolve: `gatsby-plugin-netlify-cms`,
        options: {
          htmlTitle: htmlTitle,
          modulePath: `${__dirname}/src/admin/cms.js`,
          manualInit: true,
        },
      },
    ],
  };
};
