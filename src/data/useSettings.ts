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
      seoTitleFormat
      seoTitleSeparator
      privatePagePathPrefix
      googleAnalyticsMeasurementId
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
    seoTitleFormat: string;
    seoTitleSeparator: string;
    privatePagePathPrefix: string;
    googleAnalyticsMeasurementId: string;
    disqusShortname: string;
    twitterSiteUsername: string;
  };
};

// === === === === === === === === ===

export default class Settings {
  constructor(public data: SettingsData) {}

  public getTemplateTagRenderer(): TemplateTagRenderer {
    return new TemplateTagRenderer({
      siteName: this.data.site.siteMetadata.siteName,
      siteDescription: this.data.site.siteMetadata.siteDescription,
      siteImage: this.data.site.siteMetadata.siteImage,
      siteImageAlt: this.data.site.siteMetadata.siteImageAlt,
      siteIcon: this.data.site.siteMetadata.siteIcon,
      siteIconAlt: this.data.site.siteMetadata.siteIconAlt,
      siteUrl: this.data.site.siteMetadata.siteUrl,
      seoTitleFormat: this.data.settingsYaml.seoTitleFormat,
      seoTitleSeparator: this.data.settingsYaml.seoTitleSeparator,
      privatePagePathPrefix: this.data.settingsYaml.privatePagePathPrefix,
      googleAnalyticsMeasurementId: this.data.settingsYaml.googleAnalyticsMeasurementId,
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
