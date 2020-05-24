import { graphql, useStaticQuery } from 'gatsby';
import { trimSlashes } from '../util/trim-slashes';

export const settingsQuery = graphql`
  query SettingsQuery {
    site {
      siteMetadata {
        siteName
        siteDescription
        siteImage
        siteImageAlt
        siteIcon
        siteIconAlt
        siteLanguage
        siteUrl
      }
    }
    builtInPagesYaml {
      rawIndexSlug
      rawCategoryPostListPageSlug
      rawNotFoundPageSlug
    }
    discussionYaml {
      siteWideCommentsEnabled
      disqusShortname
    }
    formsYaml {
      forms {
        formLabel
        formId
        formResponsesUrl
        formActionUrl
        formMethod
        formNameAttribute
        formAsyncEnabled
        formAsyncRequestMode
        formControls {
          fields {
            initialValue
            label
            nameAttribute
            placeholder
            required
            requiredErrorText
            type
          }
          submitButtonText
        }
      }
    }
    postYaml {
      blogEnabled
      postCategoryListPostCount
      allPostsListSlug
      postCategoryListSlug
    }
    reportingYaml {
      googleAnalytics {
        analyticsEnabled
        trackingId
        anonymize
        respectDNT
        scriptInHead
      }
      googleOAuthClientId
      buildStatusBadge {
        buildStatusBadgeImageUrl
        buildStatusBadgeImageAlt
        buildStatusBadgeImageLink
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
    }
    socialSharingYaml {
      sharing {
        facebookPostSharingEnabled
        twitterPostSharingEnabled
        linkedInPostSharingEnabled
        shareHomePageEnabled
      }
      socialAccounts {
        name
        link
        enabled
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
      siteImageAlt: string;
      siteIcon: string;
      siteIconAlt: string;
      siteLanguage: string;
      siteUrl: string;
    };
  };
  builtInPagesYaml: {
    rawIndexSlug: string;
    rawCategoryPostListPageSlug: string;
    rawNotFoundPageSlug: string;
  };

  discussionYaml: {
    siteWideCommentsEnabled: boolean;
    disqusShortname: string;
  };
  formsYaml: {
    forms: FormInfo[];
  };
  postYaml: {
    blogEnabled: boolean;
    postCategoryListPostCount: number;
    allPostsListSlug: string;
    postCategoryListSlug: string;
  };
  reportingYaml: {
    googleAnalytics: {
      analyticsEnabled: boolean;
      trackingId: string;
      anonymize: boolean;
      respectDNT: boolean;
      scriptInHead: boolean;
    };
    googleOAuthClientId: string;
    buildStatusBadge: {
      buildStatusBadgeImageUrl: string;
      buildStatusBadgeImageAlt: string;
      buildStatusBadgeImageLink: string;
    };
  };
  seoYaml: {
    seoTitleSeparator: string;
    seoConfigurations: SeoConfiguration[];
  };
  socialSharingYaml: {
    sharing: {
      facebookPostSharingEnabled: boolean;
      twitterPostSharingEnabled: boolean;
      linkedInPostSharingEnabled: boolean;
      shareHomePageEnabled: boolean;
    };
    socialAccounts: {
      name: string;
      link: string;
      enabled: boolean;
    }[];
    twitterSiteUsername: string;
  };
};

// === === === === === === === === ===

export default class Settings {
  constructor(public data: SettingsData) {
    // Remove trailing slash
    this.data.site.siteMetadata.siteUrl = (this.data.site.siteMetadata.siteUrl as string).replace(/(.*)[/]+$/, '$1');

    this.data.postYaml.allPostsListSlug = trimSlashes(this.data.postYaml.allPostsListSlug);
    this.data.postYaml.postCategoryListSlug = trimSlashes(this.data.postYaml.postCategoryListSlug);
  }

  replaceTemplateTags(templateString: string): string {
    return templateString
      .replace('{siteName}', this.data.site.siteMetadata.siteName)
      .replace('{siteDescription}', this.data.site.siteMetadata.siteDescription)
      .replace('{siteImage}', this.data.site.siteMetadata.siteImage)
      .replace('{siteIcon}', this.data.site.siteMetadata.siteIcon)
      .replace('{siteLanguage}', this.data.site.siteMetadata.siteLanguage)
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

export type RequestMode = 'cors' | 'no-cors' | 'same-origin' | 'navigate';

export type FormInfo = {
  formLabel: string;
  formId: string;
  formResponsesUrl: string;
  formActionUrl: string;
  formMethod: string;
  formNameAttribute: string;
  /** For all async `init` options, see: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters */
  formAsyncEnabled: boolean;
  formAsyncRequestMode: RequestMode;
  formControls: {
    fields: FormFieldData[];
    submitButtonText: string;
  };
};

export type FormFieldData = {
  initialValue: string;
  label: string;
  nameAttribute: string;
  placeholder: string;
  required: boolean;
  requiredErrorText: string;
  type: FieldType;
};

export type FieldType = 'text' | 'email' | 'textarea' | 'hidden';

export type NavbarPlacement = 'default' | 'fixed-top' | 'fixed-bottom' | 'sticky-top' | 'sticky-bottom';

export type NavbarDropShadow = 'none' | 'at-top' | 'just-beyond' | 'always';

export interface SeoConfiguration {
  seoConfigurationId: string;
  seoConfigurationName: string;
  seoDescription: string;
  seoTitle: string;
}
export type SeoTwitterCardType = 'summary-card' | 'summary-card-with-large-image';
