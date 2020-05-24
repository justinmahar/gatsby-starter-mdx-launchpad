import React from 'react';
import BuiltInPageLayout from '../components/layouts/BuiltInPageLayout';
import { useSettings } from '../data/useSettings';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  return (
    <BuiltInPageLayout
      rawPageSlug={useSettings().data.builtInPagesYaml.rawIndexSlug}
      pageQueryData={props.data}
      pageContext={{}}
    />
  );
}

// Page query goes here
