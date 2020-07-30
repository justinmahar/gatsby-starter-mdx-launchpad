import { graphql, useStaticQuery } from 'gatsby';

export const settingsQuery = graphql`
  query SettingsQuery {
    site {
      siteMetadata {
        siteName
        siteDescription
        siteImage
        siteImageWidth
        siteImageHeight
        siteImageAlt
        siteIcon
        siteIconAlt
        siteUrl
      }
    }
    discussionYaml {
      disqusShortname
    }
    reportingYaml {
      googleAnalytics {
        analyticsEnabled
        trackingId
        anonymize
        respectDNT
        scriptInHead
      }
    }
    seoYaml {
      seoTitleSeparator
      seoConfigurations {
        seoConfigurationId
        seoConfigurationName
        seoDescription
        seoTitle
      }
      twitterSiteUsername
    }
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type SettingsData = {
  site: {
    siteMetadata: {
      siteName: string;
      siteDescription: string;
      siteImage: string;
      siteImageWidth: number;
      siteImageHeight: number;
      siteImageAlt: string;
      siteIcon: string;
      siteIconAlt: string;
      siteUrl: string;
    };
  };
  discussionYaml: {
    disqusShortname: string;
  };
  reportingYaml: {
    googleAnalytics: {
      analyticsEnabled: boolean;
      trackingId: string;
      anonymize: boolean;
      respectDNT: boolean;
      scriptInHead: boolean;
    };
  };
  seoYaml: {
    seoTitleSeparator: string;
    seoConfigurations: SeoConfiguration[];
    twitterSiteUsername: string;
  };
};

// === === === === === === === === ===

export default class Settings {
  constructor(public data: SettingsData) {
    // Remove trailing slash
    this.data.site.siteMetadata.siteUrl = (this.data.site.siteMetadata.siteUrl as string).replace(/(.*)[/]+$/, '$1');
  }

  replaceTemplateTags(templateString: string): string {
    return templateString
      .replace('{siteName}', this.data.site.siteMetadata.siteName)
      .replace('{siteDescription}', this.data.site.siteMetadata.siteDescription)
      .replace('{siteImage}', this.data.site.siteMetadata.siteImage)
      .replace('{siteIcon}', this.data.site.siteMetadata.siteIcon)
      .replace('{siteUrl}', this.data.site.siteMetadata.siteUrl);
  }
}

export const useSettings = (): Settings => {
  const data = useStaticQuery(settingsQuery);
  return new Settings(data);
};

// === === === === === === === === === === === === === === === === === === === ===
// === Types for data                                                          ===
// === === === === === === === === === === === === === === === === === === === ===

export interface SeoConfiguration {
  seoConfigurationId: string;
  seoConfigurationName: string;
  seoDescription: string;
  seoTitle: string;
}
