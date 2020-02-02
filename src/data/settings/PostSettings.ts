import { graphql } from 'gatsby';
import { trimSlashes } from '../../util/trim-slashes';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    postYaml {
      ...postSettings
    }
  ```
*/

export const postYamlQuery = graphql`
  fragment postSettings on PostYaml {
    featuredPost {
      featuredPostEnabled
      featureNewestPostEnabled
      featuredPostSlug
      contentCueText
      customTitleText
      customTeaser
      leftQuote
      rightQuote
      buttonText
    }
    indexPagePostCount
    listPagePostCount
    postCategoryListSlug
    recentPostsWidgetPostCount
    recentPostsWidgetPostCategories {
      categoryName
    }
    allPostsListSlug
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

type PostSettingsData = {
  featuredPost: {
    featuredPostEnabled: boolean;
    featureNewestPostEnabled: boolean;
    featuredPostSlug: string;
    contentCueText: string;
    customTitleText: string;
    customTeaser: string;
    leftQuote: string;
    rightQuote: string;
    buttonText: string;
  };
  indexPagePostCount: number;
  listPagePostCount: number;
  postCategoryListSlug;
  recentPostsWidgetPostCount: number;
  recentPostsWidgetPostCategories: {
    categoryName: string;
  }[];
  allPostsListSlug: string;
};

// === === === === === === === === ===

export default class PostSettings {
  constructor(public data: PostSettingsData) {
    this.data.allPostsListSlug = trimSlashes(this.data.allPostsListSlug);
    this.data.postCategoryListSlug = trimSlashes(this.data.postCategoryListSlug);
  }
}
