import React from 'react';
import { useSettings } from '../../settings/useSettings';

export default function SiteName(): JSX.Element {
  return <>{useSettings().data.site.siteMetadata.siteName}</>;
}
