import { graphql, useStaticQuery } from 'gatsby';
import { TemplateTagRenderer } from './TemplateTagRenderer';

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
    seoTitleSeparator
    unlistedPagePathPrefix
    googleAnalyticsTrackingId
    disqusShortname
    twitterSiteUsername
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
  seoTitleSeparator: string;
  unlistedPagePathPrefix: string;
  googleAnalyticsTrackingId: string;
  disqusShortname: string;
  twitterSiteUsername: string;
};

// === === === === === === === === ===

export default class Settings {
  constructor(public data: SettingsData) { }

  public getTemplateTagRenderer(): TemplateTagRenderer {
    return new TemplateTagRenderer({
      siteName: this.data.site.siteMetadata.siteName,
      siteDescription: this.data.site.siteMetadata.siteDescription,
      siteImage: this.data.site.siteMetadata.siteImage,
      siteIcon: this.data.site.siteMetadata.siteIcon,
      siteUrl: this.data.site.siteMetadata.siteUrl,
      year: `${new Date().getFullYear()}`,
    });
  }
}

export const useSettings = (): Settings => {
  const data = useStaticQuery(settingsQuery);
  return new Settings(data);
};
