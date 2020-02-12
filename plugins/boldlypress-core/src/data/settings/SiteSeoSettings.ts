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
    siteWidePostSeoSettings {
      openGraph {
        ogDescription
        ogImage {
          ogCustomImage
          ogCustomImageAlt
          ogUseCustomOgImage
        }
        ogTitle
      }
      seoDescription
      seoImage {
        customSeoImage
        customSeoImageAlt
        useSiteImage
      }
      seoTitle
      twitterCards {
        twitterCardDescription
        twitterCardImage {
          twitterCardCustomImage
          twitterCardCustomImageAlt
          twitterCardUseCustomImage
        }
        twitterCardSiteUsername
        twitterCardTitle
        twitterCardType
      }
    }
    siteWidePageSeoSettings {
      openGraph {
        ogDescription
        ogImage {
          ogCustomImage
          ogCustomImageAlt
          ogUseCustomOgImage
        }
        ogTitle
      }
      seoDescription
      seoImage {
        customSeoImage
        customSeoImageAlt
        useSiteImage
      }
      seoTitle
      twitterCards {
        twitterCardDescription
        twitterCardImage {
          twitterCardCustomImage
          twitterCardCustomImageAlt
          twitterCardUseCustomImage
        }
        twitterCardSiteUsername
        twitterCardTitle
        twitterCardType
      }
    }
    indexSeoSettings {
      openGraph {
        ogDescription
        ogImage {
          ogCustomImage
          ogCustomImageAlt
          ogUseCustomOgImage
        }
        ogTitle
      }
      seoDescription
      seoImage {
        customSeoImage
        customSeoImageAlt
        useSiteImage
      }
      seoTitle
      twitterCards {
        twitterCardDescription
        twitterCardImage {
          twitterCardCustomImage
          twitterCardCustomImageAlt
          twitterCardUseCustomImage
        }
        twitterCardSiteUsername
        twitterCardTitle
        twitterCardType
      }
    }
    categoryPostListingPageSettings {
      openGraph {
        ogDescription
        ogImage {
          ogCustomImage
          ogCustomImageAlt
          ogUseCustomOgImage
        }
        ogTitle
      }
      seoDescription
      seoImage {
        customSeoImage
        customSeoImageAlt
        useSiteImage
      }
      seoTitle
      twitterCards {
        twitterCardDescription
        twitterCardImage {
          twitterCardCustomImage
          twitterCardCustomImageAlt
          twitterCardUseCustomImage
        }
        twitterCardSiteUsername
        twitterCardTitle
        twitterCardType
      }
    }
    notFoundPageSeoSettings {
      openGraph {
        ogDescription
        ogImage {
          ogCustomImage
          ogCustomImageAlt
          ogUseCustomOgImage
        }
        ogTitle
      }
      seoDescription
      seoImage {
        customSeoImage
        customSeoImageAlt
        seoImageSelection
      }
      seoTitle
      twitterCards {
        twitterCardDescription
        twitterCardImage {
          twitterCardCustomImage
          twitterCardCustomImageAlt
          twitterCardUseCustomImage
        }
        twitterCardSiteUsername
        twitterCardTitle
        twitterCardType
      }
    }
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type SeoSettingsData = {
  seoTitleSeparator: string;
  siteWidePostSeoSettings: {
    openGraph: {
      ogDescription: string;
      ogImage: {
        ogCustomImage: string;
        ogCustomImageAlt: string;
        ogUseCustomOgImage: boolean;
      };
      ogTitle: string;
    };
    seoDescription: string;
    seoImage: {
      customSeoImage: string;
      customSeoImageAlt: string;
      useSiteImage: boolean;
    };
    seoTitle: string;
    twitterCards: {
      twitterCardDescription: string;
      twitterCardImage: {
        twitterCardCustomImage: string;
        twitterCardCustomImageAlt: string;
        twitterCardUseCustomImage: boolean;
      };
      twitterCardSiteUsername: string;
      twitterCardTitle: string;
      twitterCardType: SeoTwitterCardType;
    };
  };
  siteWidePageSeoSettings: {
    openGraph: {
      ogDescription: string;
      ogImage: {
        ogCustomImage: string;
        ogCustomImageAlt: string;
        ogUseCustomOgImage: boolean;
      };
      ogTitle: string;
    };
    seoDescription: string;
    seoImage: {
      customSeoImage: string;
      customSeoImageAlt: string;
      useSiteImage: boolean;
    };
    seoTitle: string;
    twitterCards: {
      twitterCardDescription: string;
      twitterCardImage: {
        twitterCardCustomImage: string;
        twitterCardCustomImageAlt: string;
        twitterCardUseCustomImage: boolean;
      };
      twitterCardSiteUsername: string;
      twitterCardTitle: string;
      twitterCardType: SeoTwitterCardType;
    };
  };
  indexSeoSettings: {
    openGraph: {
      ogDescription: string;
      ogImage: {
        ogCustomImage: string;
        ogCustomImageAlt: string;
        ogUseCustomOgImage: boolean;
      };
      ogTitle: string;
    };
    seoDescription: string;
    seoImage: {
      customSeoImage: string;
      customSeoImageAlt: string;
      useSiteImage: boolean;
    };
    seoTitle: string;
    twitterCards: {
      twitterCardDescription: string;
      twitterCardImage: {
        twitterCardCustomImage: string;
        twitterCardCustomImageAlt: string;
        twitterCardUseCustomImage: boolean;
      };
      twitterCardSiteUsername: string;
      twitterCardTitle: string;
      twitterCardType: SeoTwitterCardType;
    };
  };
  categoryPostListingPageSettings: {
    openGraph: {
      ogDescription: string;
      ogImage: {
        ogCustomImage: string;
        ogCustomImageAlt: string;
        ogUseCustomOgImage: boolean;
      };
      ogTitle: string;
    };
    seoDescription: string;
    seoImage: {
      customSeoImage: string;
      customSeoImageAlt: string;
      useSiteImage: boolean;
    };
    seoTitle: string;
    twitterCards: {
      twitterCardDescription: string;
      twitterCardImage: {
        twitterCardCustomImage: string;
        twitterCardCustomImageAlt: string;
        twitterCardUseCustomImage: boolean;
      };
      twitterCardSiteUsername: string;
      twitterCardTitle: string;
      twitterCardType: SeoTwitterCardType;
    };
  };
  notFoundPageSeoSettings: {
    openGraph: {
      ogDescription: string;
      ogImage: {
        ogCustomImage: string;
        ogCustomImageAlt: string;
        ogUseCustomOgImage: boolean;
      };
      ogTitle: string;
    };
    seoDescription: string;
    seoImage: {
      customSeoImage: string;
      customSeoImageAlt: string;
      seoImageSelection: 'featured-image-if-enabled' | 'custom-image';
    };
    seoTitle: string;
    twitterCards: {
      twitterCardDescription: string;
      twitterCardImage: {
        twitterCardCustomImage: string;
        twitterCardCustomImageAlt: string;
        twitterCardUseCustomImage: boolean;
      };
      twitterCardSiteUsername: string;
      twitterCardTitle: string;
      twitterCardType: SeoTwitterCardType;
    };
  };
};

export type SeoTwitterCardType = 'summary-card' | 'summary-card-with-large-image';

// === === === === === === === === ===

export default class SeoSettings {
  constructor(public data: SeoSettingsData) {}

  getSiteWideTemplateTags(): Tags {
    return {
      seoTitleSeparator: this.data.seoTitleSeparator,
      siteWidePostSeoTitle: this.data.siteWidePostSeoSettings.seoTitle,
      siteWidePostSeoDescription: this.data.siteWidePostSeoSettings.seoDescription,
      siteWidePostOgTitle: this.data.siteWidePostSeoSettings.openGraph.ogTitle,
      siteWidePostOgDescription: this.data.siteWidePostSeoSettings.openGraph.ogDescription,
      siteWidePostTwitterCardTitle: this.data.siteWidePostSeoSettings.twitterCards.twitterCardTitle,
      siteWidePostTwitterCardDescription: this.data.siteWidePostSeoSettings.twitterCards.twitterCardDescription,
      siteWidePostTwitterCardSiteUsername: this.data.siteWidePostSeoSettings.twitterCards.twitterCardSiteUsername,
      siteWidePageSeoTitle: this.data.siteWidePageSeoSettings.seoTitle,
      siteWidePageSeoDescription: this.data.siteWidePageSeoSettings.seoDescription,
      siteWidePageOgTitle: this.data.siteWidePageSeoSettings.openGraph.ogTitle,
      siteWidePageOgDescription: this.data.siteWidePageSeoSettings.openGraph.ogDescription,
      siteWidePageTwitterCardTitle: this.data.siteWidePageSeoSettings.twitterCards.twitterCardTitle,
      siteWidePageTwitterCardDescription: this.data.siteWidePageSeoSettings.twitterCards.twitterCardDescription,
      siteWidePageTwitterCardSiteUsername: this.data.siteWidePageSeoSettings.twitterCards.twitterCardSiteUsername,
    };
  }

  getIndexSeoTempateTags(): Tags {
    return {
      contentSeoTitle: this.data.indexSeoSettings.seoTitle,
      contentSeoDescription: this.data.indexSeoSettings.seoDescription,
      contentOgTitle: this.data.indexSeoSettings.openGraph.ogTitle,
      contentOgDescription: this.data.indexSeoSettings.openGraph.ogDescription,
      contentTwitterCardTitle: this.data.indexSeoSettings.twitterCards.twitterCardTitle,
      contentTwitterCardDescription: this.data.indexSeoSettings.twitterCards.twitterCardDescription,
      contentTwitterCardSiteUsername: this.data.indexSeoSettings.twitterCards.twitterCardSiteUsername,
    };
  }
  getCategoryPostListingSeoTempateTags(): Tags {
    return {
      contentSeoTitle: this.data.categoryPostListingPageSettings.seoTitle,
      contentSeoDescription: this.data.categoryPostListingPageSettings.seoDescription,
      contentOgTitle: this.data.categoryPostListingPageSettings.openGraph.ogTitle,
      contentOgDescription: this.data.categoryPostListingPageSettings.openGraph.ogDescription,
      contentTwitterCardTitle: this.data.categoryPostListingPageSettings.twitterCards.twitterCardTitle,
      contentTwitterCardDescription: this.data.categoryPostListingPageSettings.twitterCards.twitterCardDescription,
      contentTwitterCardSiteUsername: this.data.categoryPostListingPageSettings.twitterCards.twitterCardSiteUsername,
    };
  }
  getNotFoundPageSeoTempateTags(): Tags {
    return {
      contentSeoTitle: this.data.notFoundPageSeoSettings.seoTitle,
      contentSeoDescription: this.data.notFoundPageSeoSettings.seoDescription,
      contentOgTitle: this.data.notFoundPageSeoSettings.openGraph.ogTitle,
      contentOgDescription: this.data.notFoundPageSeoSettings.openGraph.ogDescription,
      contentTwitterCardTitle: this.data.notFoundPageSeoSettings.twitterCards.twitterCardTitle,
      contentTwitterCardDescription: this.data.notFoundPageSeoSettings.twitterCards.twitterCardDescription,
      contentTwitterCardSiteUsername: this.data.notFoundPageSeoSettings.twitterCards.twitterCardSiteUsername,
    };
  }

  replaceContentTitleTemplateTag(templateString: string, contentTitle: string): string {
    return templateString.replace('{contentTitle}', contentTitle);
  }
}
