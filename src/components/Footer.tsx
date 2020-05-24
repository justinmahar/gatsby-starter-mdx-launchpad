import * as React from 'react';
import { LayoutProps } from '../../plugins/boldlypress-core/src/components/layouts/getLayout';
import { useSettings } from '../../plugins/boldlypress-core/src/data/useSettings';

export default function Footer(props: LayoutProps): JSX.Element {
  return (
    <div>
      Copyright &copy; {new Date().getFullYear()}, {useSettings().data.site.siteMetadata.siteName}. All rights
      reserved.
    </div>
  );
}
