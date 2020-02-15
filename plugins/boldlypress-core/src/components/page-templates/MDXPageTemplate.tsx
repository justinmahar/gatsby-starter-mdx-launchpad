import * as React from 'react';
import MdxContent from '../../data/MdxContent';
import { getMdxContentLayout, LayoutProps } from '../layouts/getLayout';

export interface MDXPageTemplateProps {
  pageContext: any;
  data: any;
}

export default function MDXPageTemplate(props: MDXPageTemplateProps): JSX.Element {
  const mdxContent: MdxContent = new MdxContent(props.data.mdx);
  const Layout: React.FC<LayoutProps> = getMdxContentLayout(mdxContent);
  return <Layout mdx={props.data.mdx} pageContext={props.pageContext} data={props.data} />;
}

// Page query is located in js/MDXPageTemplate.js
