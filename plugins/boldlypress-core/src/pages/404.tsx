import { graphql } from 'gatsby';
import React from 'react';
import { getMdxContentLayout, LayoutProps } from '../components/layouts/getLayout';
import MdxContent from '../data/MdxContent';
import BuiltInPagesSettings from '../data/settings/BuiltInPagesSettings';

interface NotFoundProps {
  data: any;
}

export default function NotFound(props: NotFoundProps): JSX.Element {
  const data = props.data;
  const builtInPagesSettings = new BuiltInPagesSettings(data.builtInPagesYaml);
  const mdxContent: MdxContent = new MdxContent(
    props.data.allMdx.nodes
      .map(node => new MdxContent(node))
      .find((post: MdxContent) => post.data.frontmatter.rawSlug === builtInPagesSettings.data.rawNotFoundPageSlug)
  );
  const Layout: React.FC<LayoutProps> = getMdxContentLayout(mdxContent);
  return <Layout mdx={mdxContent.data} pageContext={{}} data={props.data} />;
}

export const query = graphql`
  query NotFoundQuery {
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
