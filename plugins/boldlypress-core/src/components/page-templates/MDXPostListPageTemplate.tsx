import * as React from 'react';
import MdxContent from '../../data/MdxContent';
import BuiltInPagesSettings from '../../data/settings/BuiltInPagesSettings';
import { getMdxContentLayout, LayoutProps } from '../layouts/getLayout';
import BuiltInPageLayout from '../layouts/BuiltInPageLayout';

export interface MDXPostListPageTemplateProps {
  pageContext: any;
  data: any;
}

export default function MDXPostListPageTemplate(props: MDXPostListPageTemplateProps): JSX.Element {
  const pageQueryData = props.data;
  const builtInPagesSettings = new BuiltInPagesSettings(pageQueryData.builtInPagesYaml);
  return (
    <BuiltInPageLayout
      rawPageSlug={builtInPagesSettings.data.rawCategoryPostListPageSlug}
      pageQueryData={pageQueryData}
      pageContext={props.pageContext}
    />
  );
}

// Page query is located in js/MDXPostListPage.js
