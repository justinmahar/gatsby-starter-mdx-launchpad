import * as React from 'react';
import BuiltInPageLayout from '../layouts/BuiltInPageLayout';
import { useSettings } from '../../data/useSettings';

export interface MDXPostCategoryListTemplateProps {
  pageContext: any;
  data: any;
}

export default function MDXPostCategoryListTemplate(props: MDXPostCategoryListTemplateProps): JSX.Element {
  const settings = useSettings();
  const pageQueryData = props.data;
  return (
    <BuiltInPageLayout
      rawPageSlug={settings.data.builtInPagesYaml.rawCategoryPostListPageSlug}
      pageQueryData={pageQueryData}
      pageContext={props.pageContext}
    />
  );
}

// Page query is located in js/MDXPostListPage.js
