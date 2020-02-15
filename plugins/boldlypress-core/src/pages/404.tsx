import { graphql } from 'gatsby';
import React from 'react';
import BuiltInPageLayout from '../components/layouts/BuiltInPageLayout';
import BuiltInPagesSettings from '../data/settings/BuiltInPagesSettings';

interface NotFoundProps {
  data: any;
}

export default function NotFound(props: NotFoundProps): JSX.Element {
  const pageQueryData = props.data;
  const builtInPagesSettings = new BuiltInPagesSettings(pageQueryData.builtInPagesYaml);
  return (
    <BuiltInPageLayout
      rawPageSlug={builtInPagesSettings.data.rawNotFoundPageSlug}
      pageQueryData={pageQueryData}
      pageContext={{}}
    />
  );
}

// Page query
export const query = graphql`
  query NotFoundQuery {
    builtInPagesYaml {
      ...builtInPagesSettings
    }
  }
`;
