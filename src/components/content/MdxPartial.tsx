import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { MdxNode } from '../../data/MdxContent';
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

  const partialMdxNode: MdxNode = partialsData.allMdx.nodes.find((node: MdxNode) => node.fields.slug === props.slug);

  if (partialMdxNode) {
    return <MdxNodeRenderer mdxNode={partialMdxNode} />;
  } else return <></>;
};
