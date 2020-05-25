import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MdxContent from '../../data/MdxContent';
import { getMdxContentLayout, LayoutProps } from './getLayout';
import Settings, { useSettings } from '../../data/useSettings';
import { TemplateTags } from '../../data/TemplateTags';

export interface BuiltInPageLayoutProps {
  pageContext: any;
  pageQueryData: any;
  rawPageSlug: string;
}

export default function BuiltInPageLayout(props: BuiltInPageLayoutProps): JSX.Element {
  /* For all posts: allMdxPosts: allMdx(filter: { frontmatter: { group: { eq: "posts" } } }) */
  const data = useStaticQuery(graphql`
    query BuiltInPageLayoutQuery {
      allMdxPages: allMdx(filter: { frontmatter: { group: { eq: "pages" } } }) {
        nodes {
          ...mdxContent
        }
      }
    }
  `);
  const mdxContent: MdxContent = new MdxContent(
    data.allMdxPages.nodes.find((node) => {
      const mdxContent: MdxContent = new MdxContent(node);
      return mdxContent.data.frontmatter.rawSlug === props.rawPageSlug;
    })
  );
  const settings: Settings = useSettings();
  const templateTags: TemplateTags = mdxContent.getTemplateTags(
    settings,
    props.pageContext?.categoryName
      ? {
          contentCategory: props.pageContext.categoryName,
        }
      : undefined
  );
  const Layout: React.FC<LayoutProps> = getMdxContentLayout(mdxContent);
  return (
    <Layout
      pageContext={props.pageContext}
      pageQueryData={props.pageQueryData}
      mdxContent={mdxContent}
      settings={settings}
      templateTags={templateTags}
    />
  );
}
