import * as React from 'react';
import MdxContent from '../../data/MdxContent';
import { getMdxContentLayout, LayoutProps } from '../layouts/getLayout';
import Settings, { useSettings } from '../../data/useSettings';
import { TemplateTags } from '../../data/TemplateTags';

export interface MDXPageTemplateProps {
  pageContext: any;
  data: any;
}

export default function MDXPageTemplate(props: MDXPageTemplateProps): JSX.Element {
  const mdxContent: MdxContent = new MdxContent(props.data.mdx);
  const settings: Settings = useSettings();
  const templateTags: TemplateTags = mdxContent.getTemplateTags(settings);
  const Layout: React.FC<LayoutProps> = getMdxContentLayout(mdxContent);
  return (
    <Layout
      pageContext={props.pageContext}
      pageQueryData={props.data}
      mdxContent={mdxContent}
      settings={settings}
      templateTags={templateTags}
    />
  );
}

// Page query is located in js/MDXPageTemplate.js
