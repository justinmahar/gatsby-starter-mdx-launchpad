import { graphql } from 'gatsby';
import React from 'react';
import { getMdxContentLayout, LayoutProps } from '../components/layouts/getLayout';
import MdxContent from '../data/MdxContent';
import BuiltInPagesSettings from '../data/settings/BuiltInPagesSettings';
import BuiltInPageLayout from '../components/layouts/BuiltInPageLayout';

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

// Settings fragments are in: src/data
export const query = graphql`
  query IndexQuery {
    builtInPagesYaml {
      ...builtInPagesSettings
    }
  }
`;
