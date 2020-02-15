import * as React from 'react';
import MdxContent from '../../data/MdxContent';
import BuiltInPagesSettings from '../../data/settings/BuiltInPagesSettings';
import { getMdxContentLayout, LayoutProps } from '../layouts/getLayout';

export interface MDXPostListPageTemplateProps {
  pageContext: any;
  data: any;
}

export default function MDXPostListPageTemplate(props: MDXPostListPageTemplateProps): JSX.Element {
  const builtInPagesSettings = new BuiltInPagesSettings(props.data.builtInPagesYaml);
  const mdxContent: MdxContent = new MdxContent(
    props.data.allMdx.nodes
      .map(node => new MdxContent(node))
      .find(
        (post: MdxContent) => post.data.frontmatter.rawSlug === builtInPagesSettings.data.rawCategoryPostListingPageSlug
      )
  );
  const Layout: React.FC<LayoutProps> = getMdxContentLayout(mdxContent);
  return <Layout mdx={props.data.mdx} pageContext={props.pageContext} data={props.data} />;
}

// Page query is located in js/MDXPostListPage.js
