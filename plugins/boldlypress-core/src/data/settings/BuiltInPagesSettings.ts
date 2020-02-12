import { graphql } from 'gatsby';
import { Tags } from '../../util/render-template-tags';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    builtInPagesYaml {
      ...pageSettings
    }
  ```
*/
export const pageSettingsYamlQuery = graphql`
  fragment builtInPagesSettings on BuiltInPagesYaml {
    indexSettings {
      rawIndexSlug
    }
    categoryPostListingPageSettings {
      rawCategoryPostListingPageSlug
      contentTitle
      showSidebar
    }
    notFoundPageSettings {
      rawNotFoundPageSlug
      bodyImage
      bodyImageAlt
      bodyText
      buttonText
      buttonUrl
      contentTitle
      featuredImage {
        featuredImageEnabled
        featuredImageUrl
        featuredImageAlt
      }
      headline
    }
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type BuiltInPageSettingsData = {
  indexSettings: {
    rawIndexSlug: string;
  };
  categoryPostListingPageSettings: {
    rawCategoryPostListingPageSlug: string;
    contentTitle: string;
    showSidebar: boolean;
  };
  notFoundPageSettings: {
    rawNotFoundPageSlug: string;
    bodyImage: string;
    bodyImageAlt: string;
    bodyText: string;
    buttonText: string;
    buttonUrl: string;
    contentTitle: string;
    featuredImage: {
      featuredImageEnabled: boolean;
      featuredImageUrl: string;
      featuredImageAlt: string;
    };
    headline: string;
  };
};

// === === === === === === === === ===

export default class BuiltInPagesSettings {
  constructor(public data: BuiltInPageSettingsData) {}

  getCategoryPostListingTemplateTags(): Tags {
    return {
      contentTitle: this.data.categoryPostListingPageSettings.contentTitle,
    };
  }

  getNotFoundTemplateTags(): Tags {
    return {
      contentTitle: this.data.notFoundPageSettings.contentTitle,
    };
  }
}
