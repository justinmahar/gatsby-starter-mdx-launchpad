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

const path = require('path');

const BUILT_IN_PAGE_SLUGS = ['index', 'not-found'];

const UNLISTED_PATH_PREFIX = 'private/';

exports.onCreateNode = ({ node, actions }, pluginOptions) => {
  // https://gatsby-mdx.netlify.com/guides/programmatically-creating-pages
  const { createNodeField } = actions;
  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
    const rawSlug = node.frontmatter.rawSlug;
    // Create a URL safe slug by lowercasing and replacing all non-letters
    let safeSlug = rawSlug.toLocaleLowerCase().replace(/\W/gi, '-');

    createNodeField({
      // Name of the field you are adding
      name: 'slug',
      // Individual MDX node
      node,
      // URL safe slug for the content
      value: safeSlug,
    });
  }
};

exports.createPages = ({ graphql, actions }, pluginOptions) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;

  // https://gatsby-mdx.netlify.com/guides/programmatically-creating-pages
  const mdxQueryPromise = graphql(`
    query NodeMDXQuery {
      allMdx {
        nodes {
          fields {
            slug
          }
          frontmatter {
            group
            options {
              hidden
              unlisted
            }
          }
        }
      }
    }
  `).then((result) => {
    // This is some boilerlate to handle errors
    if (result.errors) {
      console.error(result.errors);
      Promise.reject(result.errors);
    }

    const mdxNodes = result.data.allMdx.nodes;

    const mdxPageTemplate = path.resolve(`${__dirname}/src/components/page-templates/js/MDXPageTemplate.js`);

    // We'll call `createPage` for each result, creating each page.
    mdxNodes.forEach((node) => {
      // Don't create pages for the hidden or built-in ones
      if (!node.frontmatter.options.hidden && !BUILT_IN_PAGE_SLUGS.includes(node.frontmatter.rawSlug)) {
        const pageConfig = {
          // This is the slug we created in onCreateNode
          path: `${node.frontmatter.options.unlisted ? UNLISTED_PATH_PREFIX : ''}${node.fields.slug}`,
          // This component will wrap our MDX content
          component: mdxPageTemplate,
          // Data passed to context is available in props and
          // page queries as GraphQL variables.
          context: {
            slug: node.fields.slug,
          },
        };

        // https://www.gatsbyjs.org/docs/actions/#createPage
        createPage(pageConfig);
      }
    });
  });

  // On running multiple queries:
  // https://swas.io/blog/using-multiple-queries-on-gatsbyjs-createpages-node-api/
  return Promise.all([mdxQueryPromise]);
};
