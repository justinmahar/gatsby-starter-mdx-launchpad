import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MdxContent from '../../data/MdxContent';
import { getMdxContentLayout, LayoutProps } from './getLayout';

export interface BuiltInPageLayoutProps {
  pageContext: any;
  pageQueryData: any;
  rawPageSlug: string;
}

export default function BuiltInPageLayout(props: BuiltInPageLayoutProps): JSX.Element {
  const staticQueryData = useStaticQuery(graphql`
    query BuiltInPageLayoutQuery {
      allMdxPages: allMdx(filter: { frontmatter: { group: { eq: "pages" } } }) {
        nodes {
          ...mdxContent
        }
      }
    }
  `);

  const mdxContent: MdxContent = new MdxContent(
    staticQueryData.allMdxPages.nodes.find(node => {
      const mdxContent: MdxContent = new MdxContent(node);
      return mdxContent.data.frontmatter.rawSlug === props.rawPageSlug;
    })
  );
  const Layout: React.FC<LayoutProps> = getMdxContentLayout(mdxContent);
  return <Layout mdx={mdxContent.data} pageContext={props.pageContext} pageQueryData={props.pageQueryData} />;
}
