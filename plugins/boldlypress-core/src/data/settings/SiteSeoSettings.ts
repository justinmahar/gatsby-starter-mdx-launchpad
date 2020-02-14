import { graphql } from 'gatsby';
import { Tags } from '../../util/render-template-tags';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    seoYaml {
      ...siteSeoSettings
    }
  ```
*/
export const seoYamlQuery = graphql`
  fragment siteSeoSettings on SeoYaml {
    seoTitleSeparator
    seoConfigurations {
      seoConfigurationId
      seoConfigurationName
      seoDescription
      seoTitle
    }
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export interface SeoConfiguration {
  seoConfigurationId: string;
  seoConfigurationName: string;
  seoDescription: string;
  seoTitle: string;
}

export type SiteSeoSettingsData = {
  seoTitleSeparator: string;
  seoConfigurations: SeoConfiguration[];
};

export type SeoTwitterCardType = 'summary-card' | 'summary-card-with-large-image';

// === === === === === === === === ===

export default class SiteSeoSettings {
  constructor(public data: SiteSeoSettingsData) {}

  getTemplateTagsFor(configuration: SeoConfiguration): Tags {
    return {
      seoTitleSeparator: this.data.seoTitleSeparator,
      configSeoTitle: configuration.seoTitle,
      configSeoDescription: configuration.seoDescription,
    };
  }
}
