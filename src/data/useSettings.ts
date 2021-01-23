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
    settingsYaml {
      seoTitleSeparator
      privatePagePathPrefix
      googleAnalyticsTrackingId
      disqusShortname
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
  settingsYaml: {
    seoTitleSeparator: string;
    privatePagePathPrefix: string;
    googleAnalyticsTrackingId: string;
    disqusShortname: string;
    twitterSiteUsername: string;
  };
};

// === === === === === === === === ===

export default class Settings {
  constructor(public data: SettingsData) { }

  public getTemplateTagRenderer(): TemplateTagRenderer {
    return new TemplateTagRenderer({
      siteName: this.data.site.siteMetadata.siteName,
      siteDescription: this.data.site.siteMetadata.siteDescription,
      siteImage: this.data.site.siteMetadata.siteImage,
      siteImageAlt: this.data.site.siteMetadata.siteImageAlt,
      siteIcon: this.data.site.siteMetadata.siteIcon,
      siteIconAlt: this.data.site.siteMetadata.siteIconAlt,
      siteUrl: this.data.site.siteMetadata.siteUrl,
      seoTitleSeparator: this.data.settingsYaml.seoTitleSeparator,
      privatePagePathPrefix: this.data.settingsYaml.privatePagePathPrefix,
      googleAnalyticsTrackingId: this.data.settingsYaml.googleAnalyticsTrackingId,
      disqusShortname: this.data.settingsYaml.disqusShortname,
      twitterSiteUsername: this.data.settingsYaml.twitterSiteUsername,
      year: `${new Date().getFullYear()}`,
    });
  }
}

export const useSettings = (): Settings => {
  const data = useStaticQuery(settingsQuery);
  return new Settings(data);
};
