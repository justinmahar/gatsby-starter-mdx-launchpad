import * as React from 'react';
import { LayoutProps } from '../getLayout';

export default function DefaultHeader(props: LayoutProps): JSX.Element {
  return (
    <div>
      <strong>{props.settings.data.site.siteMetadata.siteName}</strong>
    </div>
  );
}
