import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MdxContent from '../../data/MdxContent';
import { getMdxContentLayout, LayoutProps } from './getLayout';
import Settings, { useSettings } from '../../data/useSettings';
import { TemplateTags } from '../../data/TemplateTags';

export interface BuiltInPageLayoutProps {
  pageContext: any;
  pageQueryData: any;
  rawSlug: string;
}

export default function BuiltInPageLayout(props: BuiltInPageLayoutProps): JSX.Element {
  const data = useStaticQuery(graphql`
    query BuiltInPageLayoutQuery {
      builtInPages: allMdx(filter: { frontmatter: { rawSlug: { in: ["index", "not-found"] } } }) {
        nodes {
          ...mdxContent
        }
      }
    }
  `);
  const mdxContent: MdxContent = new MdxContent(
    data.builtInPages.nodes.find((node: any) => {
      const mdxContent: MdxContent = new MdxContent(node);
      return mdxContent.data.frontmatter.rawSlug === props.rawSlug;
    })
  );
  const settings: Settings = useSettings();
  const templateTags: TemplateTags = mdxContent.getTemplateTags(settings);
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
