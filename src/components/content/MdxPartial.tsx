import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { MdxNodeRenderer } from './MdxNodeRenderer';

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

  const partialMdxNode: any = partialsData.allMdx.nodes.find((node: any) => node?.fields?.slug === props.slug);

  if (partialMdxNode) {
    return <MdxNodeRenderer mdxNode={partialMdxNode} />;
  } else return <></>;
};
