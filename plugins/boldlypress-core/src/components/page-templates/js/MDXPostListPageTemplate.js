import { graphql } from 'gatsby';
import React from 'react';
import Page from '../MDXPostListPageTemplate';

// This component is a wrapper for the TSX layout component of the
// same name.
// It needs to be a JS file because it's loaded directly in createPages in gatsby-node.js.

function MDXPostListPage(props) {
  return <Page {...props} />;
}

export default MDXPostListPage;

export const query = graphql`
  query MDXPostListPageQuery($skip: Int!, $limit: Int!, $categorySlugGlob: String!) {
    site {
      siteMetadata {
        ...siteMetadataCommons
      }
    }
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { group: { eq: "posts" } }, fields: { categorySlug: { glob: $categorySlugGlob } } }
    ) {
      nodes {
        ...mdxContent
      }
    }
    seoYaml {
      ...seoSettings
    }
    mailingListYaml {
      ...mailingListSettings
    }
    postYaml {
      ...postSettings
    }
    discussionYaml {
      ...discussionSettings
    }
    socialSharingYaml {
      ...socialSharingSettings
    }
    builtInPagesYaml {
      ...builtInPagesSettings
    }
  }
`;
