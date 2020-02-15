import { graphql } from 'gatsby';
import React from 'react';
import TsxMDXPageTemplate from '../MDXPageTemplate';

// This component is a wrapper for the TSX layout component of the
// same name.
// It needs to be a JS file because it's loaded directly by the MDX
// plug-in in gatsby-node.js.

function MDXPageTemplate(props) {
  return <TsxMDXPageTemplate {...props} />;
}

export default MDXPageTemplate;

export const query = graphql`
  query MDXPageComponentQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      ...mdxContent
    }
  }
`;
