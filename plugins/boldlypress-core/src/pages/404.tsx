import { graphql } from 'gatsby';
import React from 'react';
import BuiltInPageLayout from '../components/layouts/BuiltInPageLayout';
import { useSettings } from '../data/useSettings';

interface NotFoundProps {
  data: any;
}

export default function NotFound(props: NotFoundProps): JSX.Element {
  return (
    <BuiltInPageLayout
      rawPageSlug={useSettings().data.builtInPagesYaml.rawNotFoundPageSlug}
      pageQueryData={props.data}
      pageContext={{}}
    />
  );
}

// Page query goes here
