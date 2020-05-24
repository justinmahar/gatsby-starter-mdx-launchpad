import * as React from 'react';
import { LayoutProps } from '../../plugins/boldlypress-core/src/components/layouts/getLayout';

export default function Header(props: LayoutProps): JSX.Element {
  return (
    <div>
      <strong>{props.settings.data.site.siteMetadata.siteName}</strong>
    </div>
  );
}
