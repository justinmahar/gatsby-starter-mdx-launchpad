import * as React from 'react';
import { useSettings } from '../../data/useSettings';

export default function SiteName(): JSX.Element {
  return <>{useSettings().data.site.siteMetadata.siteName}</>;
}
