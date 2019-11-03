import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import ReportingSettings from '../../data/settings/ReportingSettings';
import TimedRenderComponent from "../TimedRenderComponent"

export interface IBuildStatusBadgeProps {
}

export default function BuildStatusBadge(props: IBuildStatusBadgeProps) {

  const RENDER_INTERVAL_IN_MS = 5000

  const data = useStaticQuery(graphql`
    query BuildStatusBadgeQuery {
      reportingJson {
        ...reportingSettings
      }
    }
  `)
  const reportingSettings = new ReportingSettings(data.reportingJson)

  const paramSymbol = reportingSettings.data.buildStatusBadge.buildStatusBadgeImageUrl.indexOf("?") >= 0 ? "&" : "?"

  const useLink = reportingSettings.data.buildStatusBadge.buildStatusBadgeImageLink !== "none"

  const badgeRender = (time: number): JSX.Element => {
    return (
      <a href={useLink ? reportingSettings.data.buildStatusBadge.buildStatusBadgeImageLink : undefined}>
        <img
          src={`${reportingSettings.data.buildStatusBadge.buildStatusBadgeImageUrl}${paramSymbol}time=${time}`}
          alt={reportingSettings.data.buildStatusBadge.buildStatusBadgeImageAlt !== "none" ? reportingSettings.data.buildStatusBadge.buildStatusBadgeImageAlt : undefined}
        />
      </a>)
  }

  return (
    <TimedRenderComponent interval={RENDER_INTERVAL_IN_MS} render={badgeRender} />
  );
}
