import * as React from 'react';
import BuiltInPageLayout from '../layouts/BuiltInPageLayout';

export interface MDXPostListPageTemplateProps {
  pageContext: any;
  data: any;
}

export default function MDXPostListPageTemplate(props: MDXPostListPageTemplateProps): JSX.Element {
  const pageQueryData = props.data;
  return (
    <BuiltInPageLayout
      rawPageSlug={pageQueryData.builtInPagesYaml.rawCategoryPostListPageSlug}
      pageQueryData={pageQueryData}
      pageContext={props.pageContext}
    />
  );
}

// Page query is located in js/MDXPostListPage.js
