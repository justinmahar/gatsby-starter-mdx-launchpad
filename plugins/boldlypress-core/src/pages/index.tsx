import { graphql } from 'gatsby';
import React from 'react';
import { getMdxContentLayout, LayoutProps } from '../components/layouts/getLayout';
import MdxContent from '../data/MdxContent';
import BuiltInPagesSettings from '../data/settings/BuiltInPagesSettings';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  const data = props.data;
  const builtInPagesSettings = new BuiltInPagesSettings(data.builtInPagesYaml);
  const mdxContent: MdxContent = new MdxContent(
    props.data.allMdx.nodes
      .map(node => new MdxContent(node))
      .find((page: MdxContent) => page.data.frontmatter.rawSlug === builtInPagesSettings.data.rawIndexSlug)
  );
  const Layout: React.FC<LayoutProps> = getMdxContentLayout(mdxContent);
  return <Layout mdx={mdxContent.data} pageContext={{}} data={props.data} />;
}

// Settings fragments are in: src/data
export const query = graphql`
  query IndexQuery {
    allMdx(filter: { frontmatter: { group: { eq: "pages" } } }) {
      nodes {
        ...mdxContent
      }
    }
    builtInPagesYaml {
      ...builtInPagesSettings
    }
  }
`;
