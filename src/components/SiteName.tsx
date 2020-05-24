import * as React from 'react';
import { useSettings } from '../../plugins/boldlypress-core/src/data/useSettings';

export default function SiteName(): JSX.Element {
  return <>{useSettings().data.site.siteMetadata.siteName}</>;
}
