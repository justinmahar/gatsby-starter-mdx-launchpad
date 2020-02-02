import { graphql } from 'gatsby';
import React from 'react';
import Page from '../MDXPageTemplate';

// This component is a wrapper for the TSX layout component of the
// same name.
// It needs to be a JS file because it's loaded directly by the MDX
// plug-in in gatsby-node.js.

function MDXPageTemplate(props) {
  return <Page {...props} />;
}

export default MDXPageTemplate;

export const query = graphql`
  query MDXPageComponentQuery($slug: String!, $modelPageSlug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      ...mdxContent
    }
    # Alias as modelPageMdx
    modelPageMdx: mdx(fields: { slug: { eq: $modelPageSlug } }) {
      ...mdxContent
    }
  }
`;
