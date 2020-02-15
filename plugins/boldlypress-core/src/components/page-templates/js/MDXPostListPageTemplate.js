import { graphql } from 'gatsby';
import React from 'react';
import TsxMDXPostListPageTemplate from '../MDXPostListPageTemplate';

// This component is a wrapper for the TSX layout component of the
// same name.
// It needs to be a JS file because it's loaded directly in createPages in gatsby-node.js.

function MDXPostListPage(props) {
  return <TsxMDXPostListPageTemplate {...props} />;
}

export default MDXPostListPage;

export const query = graphql`
  query MDXPostListPageQuery($skip: Int!, $limit: Int!, $categorySlugGlob: String!) {
    mdxPosts: allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { group: { eq: "posts" } }, fields: { categorySlug: { glob: $categorySlugGlob } } }
    ) {
      nodes {
        ...mdxContent
      }
    }
    builtInPagesYaml {
      ...builtInPagesSettings
    }
  }
`;
