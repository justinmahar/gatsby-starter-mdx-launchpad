import { graphql, useStaticQuery } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

interface Props {
  slug: string;
}

export const MdxPartial = (props: Props): JSX.Element => {
  const partialsData: any = useStaticQuery(graphql`
    query PartialsQuery {
      allMdx(filter: { frontmatter: { partial: { eq: true } } }) {
        nodes {
          ...mdxContent
        }
      }
    }
  `);

  const partialData: any = partialsData.allMdx.nodes.find((node: any) => node?.fields?.slug === props.slug);

  if (partialData) {
    return (
      <MDXRenderer scope={undefined} components={undefined}>
        {partialData.body}
      </MDXRenderer>
    );
  } else return <></>;
};
