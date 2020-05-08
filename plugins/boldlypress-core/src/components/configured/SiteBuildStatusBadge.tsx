import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import ReportingSettings from '../../data/settings/ReportingSettings';
import { BuildStatusBadge } from 'react-build-status-badge';

export default function SiteBuildStatusBadge(props: {}): JSX.Element {
  const data = useStaticQuery(graphql`
    query BuildStatusBadgeQuery {
      reportingYaml {
        ...reportingSettings
      }
    }
  `);
  const reportingSettings = new ReportingSettings(data.reportingYaml);

  const useLink = reportingSettings.data.buildStatusBadge.buildStatusBadgeImageLink !== 'none';

  const alt: string | undefined =
    reportingSettings.data.buildStatusBadge.buildStatusBadgeImageAlt !== 'none'
      ? reportingSettings.data.buildStatusBadge.buildStatusBadgeImageAlt
      : undefined;
  const src: string = reportingSettings.data.buildStatusBadge.buildStatusBadgeImageUrl;
  const href: string | undefined = useLink
    ? reportingSettings.data.buildStatusBadge.buildStatusBadgeImageLink
    : undefined;

  return <BuildStatusBadge alt={alt} src={src} href={href} linkDisabled={false} />;
}
