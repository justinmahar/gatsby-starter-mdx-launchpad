import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import ReportingSettings from '../../data/settings/ReportingSettings';
import TimedRenderer from '@devboldly/react-timed-renderer';

export default function BuildStatusBadge(props: {}): JSX.Element {
  const RENDER_INTERVAL_IN_MS = 5000;

  const data = useStaticQuery(graphql`
    query BuildStatusBadgeQuery {
      reportingYaml {
        ...reportingSettings
      }
    }
  `);
  const reportingSettings = new ReportingSettings(data.reportingYaml);

  const paramSymbol = reportingSettings.data.buildStatusBadge.buildStatusBadgeImageUrl.indexOf('?') >= 0 ? '&' : '?';

  const useLink = reportingSettings.data.buildStatusBadge.buildStatusBadgeImageLink !== 'none';

  const badgeRender = (time: number): JSX.Element => {
    return (
      <a href={useLink ? reportingSettings.data.buildStatusBadge.buildStatusBadgeImageLink : undefined}>
        <img
          src={`${reportingSettings.data.buildStatusBadge.buildStatusBadgeImageUrl}${paramSymbol}time=${time}`}
          alt={
            reportingSettings.data.buildStatusBadge.buildStatusBadgeImageAlt !== 'none'
              ? reportingSettings.data.buildStatusBadge.buildStatusBadgeImageAlt
              : undefined
          }
        />
      </a>
    );
  };

  return <TimedRenderer interval={RENDER_INTERVAL_IN_MS} render={badgeRender} />;
}
