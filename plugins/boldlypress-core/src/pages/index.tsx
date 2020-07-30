import React from 'react';
import BuiltInPageLayout from '../components/layouts/BuiltInPageLayout';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  return <BuiltInPageLayout rawSlug="index" pageQueryData={props.data} pageContext={{}} />;
}

// Page query goes here
