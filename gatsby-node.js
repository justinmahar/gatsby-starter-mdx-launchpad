/**
 * Gatsby gives plugins and site builders many APIs for controlling your site.
 *
 * APIs:
 *   - createPages
 *   - createPagesStatefully
 *   - createResolvers
 *   - createSchemaCustomization
 *   - generateSideEffects
 *   - onCreateBabelConfig
 *   - onCreateDevServer
 *   - onCreateNode
 *   - onCreatePage
 *   - onCreateWebpackConfig
 *   - onPostBootstrap
 *   - onPostBuild
 *   - onPreBootstrap
 *   - onPreBuild
 *   - onPreExtractQueries
 *   - onPreInit
 *   - preprocessSource
 *   - resolvableExtensions
 *   - setFieldsOnGraphQLNodeType
 *   - sourceNodes
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === 'build-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /html2canvas/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     });
//   }
// };
