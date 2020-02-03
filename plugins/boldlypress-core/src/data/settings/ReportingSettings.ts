import { graphql } from 'gatsby';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    reportingJson {
      ...reportingSettings
    }
  ```
*/

export const reportingJsonQuery = graphql`
  fragment reportingSettings on ReportingJson {
    googleAnalytics {
      analyticsEnabled
      trackingId
      anonymize
      respectDNT
      scriptInHead
    }
    buildStatusBadge {
      buildStatusBadgeImageUrl
      buildStatusBadgeImageAlt
      buildStatusBadgeImageLink
    }
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

type ReportingSettingsData = {
  googleAnalytics: {
    analyticsEnabled: boolean;
    trackingId: string;
    anonymize: boolean;
    respectDNT: boolean;
    scriptInHead: boolean;
  };
  buildStatusBadge: {
    buildStatusBadgeImageUrl: string;
    buildStatusBadgeImageAlt: string;
    buildStatusBadgeImageLink: string;
  };
};

// === === === === === === === === ===

export default class ReportingSettings {
  constructor(public data: ReportingSettingsData) {}
}
