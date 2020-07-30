import React from 'react';
import BuiltInPageLayout from '../components/layouts/BuiltInPageLayout';

interface NotFoundProps {
  data: any;
}

export default function NotFound(props: NotFoundProps): JSX.Element {
  return <BuiltInPageLayout rawSlug="not-found" pageQueryData={props.data} pageContext={{}} />;
}

// Page query goes here
