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

const INDEX_SLUG = '__index';
const NOT_FOUND_SLUG = '__404';
const CATEGORY_POST_LISTING_PAGE_SLUG = '__category_post_listing_page';
const BUILT_IN_SLUGS = [INDEX_SLUG, NOT_FOUND_SLUG, CATEGORY_POST_LISTING_PAGE_SLUG];

// Post category used when none is specified.
const NONE_CATEGORY = 'none';

/**
 * Trims off leading and trailing slashes (both / and \\) from the path.
 * For example, `"/pages/about/"` will be returned as `"pages/about"`.
 * This function can be used to ensure the correct number of slashes are present
 * when building URLs.
 *
 * If no slashes are present at the beginning or end of the path, the path is returned as is.
 * @param path The path string that may start or end with slashes.
 * @returns The path without leading or trailing slashes.
 */
function trimSlashes(path) {
  if (!!path && path.length > 0) {
    path = path.startsWith('/') || path.startsWith('\\') ? path.slice(1) : path;
    path = path.endsWith('/') || path.endsWith('\\') ? path.slice(0, path.length - 1) : path;
  }
  return path;
}

exports.onCreateNode = ({ node, actions, getNode }, pluginOptions) => {
  // First, determine which pages are being set aside for the built-in pages
  // like the index, 404, etc. These are the raw user-defined slugs.
  // Those pages won't be created with their own slugs but will instead get predefined ones
  // that can be selected on later.
  const rawIndexSlug = pluginOptions.builtInPageSettings.rawIndexSlug;
  const rawCategoryPostListingPageSlug = pluginOptions.builtInPageSettings.rawCategoryPostListingPageSlug;
  const rawNotFoundPageSlug = pluginOptions.builtInPageSettings.rawNotFoundPageSlug;

  // https://gatsby-mdx.netlify.com/guides/programmatically-creating-pages
  const { createNodeField } = actions;
  // We only want to operate on `Mdx` nodes. If we had content from a
  // remote CMS we could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
    const rawSlug = node.frontmatter.rawSlug;
    // Create a URL safe slug by lowercasing and replacing all non-letters
    let safeSlug = rawSlug.toLocaleLowerCase().replace(/\W/gi, '-');

    // Hardcode the built-in page slugs. These will be used in their page queries.
    switch (rawSlug) {
      case rawIndexSlug:
        safeSlug = INDEX_SLUG;
        break;
      case rawCategoryPostListingPageSlug:
        safeSlug = CATEGORY_POST_LISTING_PAGE_SLUG;
        break;
      case rawNotFoundPageSlug:
        safeSlug = NOT_FOUND_SLUG;
        break;
      default:
    }

    createNodeField({
      // Name of the field you are adding
      name: 'slug',
      // Individual MDX node
      node,
      // URL safe slug for the content
      value: safeSlug,
    });

    // Retrieve the category, or use none if not specified.
    const category = node.frontmatter.category ? node.frontmatter.category : NONE_CATEGORY;
    // Create a slug from the category by lowercasing and replacing all non-letters
    const categorySlug = category.toLowerCase().replace(/\W/gi, '-');
    createNodeField({
      // Name of the field you are adding
      name: 'categorySlug',
      // Individual MDX node
      node,
      // The slug value
      value: categorySlug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;

  const mdxPageTemplate = path.resolve(`./src/components/page-templates/js/MDXPageTemplate.js`);
  const mdxPostListPageTemplate = path.resolve(`./src/components/page-templates/js/MDXPostListPageTemplate.js`);

  // https://gatsby-mdx.netlify.com/guides/programmatically-creating-pages
  const mdxQueryPromise = graphql(`
    query NodeMDXQuery {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        nodes {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            group
            category
            hidden
          }
        }
      }
      postYaml {
        listPagePostCount
        allPostsListSlug
        postCategoryListSlug
      }
    }
  `).then(result => {
    // This is some boilerlate to handle errors
    if (result.errors) {
      console.error(result.errors);
      Promise.reject(result.errors);
    }

    const mdxNodes = result.data.allMdx.nodes;

    // We'll call `createPage` for each result, creating each post page.
    mdxNodes.forEach(node => {
      // Don't create pages for the hidden or built-in ones
      if (!node.frontmatter.hidden && !BUILT_IN_SLUGS.includes(node.fields.slug)) {
        const pageConfig = {
          // This is the slug we created in onCreateNode
          path: node.fields.slug,
          // This component will wrap our MDX content
          component: mdxPageTemplate,
          // Data passed to context is available in props and
          // page queries as GraphQL variables.
          context: {
            slug: node.fields.slug,
            modelPageSlug: 'page-not-found',
          },
        };

        // https://www.gatsbyjs.org/docs/actions/#createPage
        createPage(pageConfig);
      }
    });

    // Next, we need to create listing pages for all the posts.

    // Collect all the post settings we'll need
    const postsPerPage = result.data.postYaml.listPagePostCount;
    const allPostsListSlug = trimSlashes(result.data.postYaml.allPostsListSlug);
    const postCategoryListSlug = trimSlashes(result.data.postYaml.postCategoryListSlug);

    // Collect all posts together.
    // These will be in the "posts" group defined in the frontmatter.
    const posts = mdxNodes.filter(mdxNode => {
      return (
        mdxNode.frontmatter.group === 'posts' &&
        // Don't list hidden or built-in ones
        !mdxNode.frontmatter.hidden &&
        !BUILT_IN_SLUGS.includes(mdxNode.fields.slug)
      );
    });
    const postCount = posts.length;

    // Build a map of all the category slugs to display names.
    // All posts with the category slug "none" are ignored.
    const postCategorySlugsToNames = {};
    posts
      .filter(post => !!post.fields.categorySlug && post.fields.categorySlug !== NONE_CATEGORY)
      .forEach(post => {
        if (!postCategorySlugsToNames[post.fields.categorySlug]) {
          postCategorySlugsToNames[post.fields.categorySlug] = post.frontmatter.category;
        }
      });
    // Get an array of the post slugs.
    const postCategorySlugs = Object.keys(postCategorySlugsToNames);

    // Create listing pages for all posts.
    const totalNumPages = Math.ceil(postCount / postsPerPage);
    Array.from({ length: totalNumPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/${allPostsListSlug}` : `/${allPostsListSlug}/${i + 1}`,
        component: mdxPostListPageTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          categorySlugGlob: '*',
          numPages: totalNumPages,
          categoryName: 'All',
          currentPage: i + 1,
        },
      });
    });

    // Now we'll create listing pages for each categorySlug.
    postCategorySlugs.forEach(categorySlug => {
      const posts = mdxNodes.filter(node => node.fields.categorySlug === categorySlug);
      const numCategoryPages = Math.ceil(posts.length / postsPerPage);
      Array.from({ length: numCategoryPages }).forEach((_, i) => {
        createPage({
          path:
            i === 0 ? `/${postCategoryListSlug}/${categorySlug}` : `/${postCategoryListSlug}/${categorySlug}/${i + 1}`,
          component: mdxPostListPageTemplate,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            categorySlugGlob: categorySlug,
            numPages: numCategoryPages,
            categoryName: postCategorySlugsToNames[categorySlug],
            currentPage: i + 1,
          },
        });
      });
    });
  });

  // On running multiple queries:
  // https://swas.io/blog/using-multiple-queries-on-gatsbyjs-createpages-node-api/
  return Promise.all([mdxQueryPromise]);
};
