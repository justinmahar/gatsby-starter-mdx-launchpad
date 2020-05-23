import * as React from 'react';
import { BuildStatusBadge } from 'react-build-status-badge';
import Settings, { useSettings } from '../../data/useSettings';

export default function SiteBuildStatusBadge(props: {}): JSX.Element {
  const settings: Settings = useSettings();
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
