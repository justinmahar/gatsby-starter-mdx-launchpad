import { graphql } from 'gatsby';
import React from 'react';
import BuiltInPageLayout from '../components/layouts/BuiltInPageLayout';
import BuiltInPagesSettings from '../data/settings/BuiltInPagesSettings';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  const pageQueryData = props.data;
  const builtInPagesSettings = new BuiltInPagesSettings(pageQueryData.builtInPagesYaml);
  return (
    <BuiltInPageLayout
      rawPageSlug={builtInPagesSettings.data.rawIndexSlug}
      pageQueryData={pageQueryData}
      pageContext={{}}
    />
  );
}

// Page query
export const query = graphql`
  query IndexQuery {
    builtInPagesYaml {
      ...builtInPagesSettings
    }
  }
`;
