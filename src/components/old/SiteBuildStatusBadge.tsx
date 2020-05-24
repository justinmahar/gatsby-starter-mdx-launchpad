import * as React from 'react';
import { BuildStatusBadge } from 'react-build-status-badge';
import { useSettings } from '../../../plugins/boldlypress-core/src/data/useSettings';

export default function SiteBuildStatusBadge(props: {}): JSX.Element {
  const settings = useSettings();
  const useLink = settings.data.reportingYaml.buildStatusBadge.buildStatusBadgeImageLink !== 'none';

  const alt: string | undefined =
    settings.data.reportingYaml.buildStatusBadge.buildStatusBadgeImageAlt !== 'none'
      ? settings.data.reportingYaml.buildStatusBadge.buildStatusBadgeImageAlt
      : undefined;
  const src: string = settings.data.reportingYaml.buildStatusBadge.buildStatusBadgeImageUrl;
  const href: string | undefined = useLink
    ? settings.data.reportingYaml.buildStatusBadge.buildStatusBadgeImageLink
    : undefined;

  return <BuildStatusBadge alt={alt} src={src} href={href} linkDisabled={false} />;
}
