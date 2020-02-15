import { graphql } from 'gatsby';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    builtInPagesYaml {
      ...builtInPagesSettings
    }
  ```
*/
export const builtInPagesYamlQuery = graphql`
  fragment builtInPagesSettings on BuiltInPagesYaml {
    rawIndexSlug
    rawCategoryPostListPageSlug
    rawNotFoundPageSlug
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type BuiltInPageSettingsData = {
  rawIndexSlug: string;
  rawCategoryPostListPageSlug: string;
  rawNotFoundPageSlug: string;
};

// === === === === === === === === ===

export default class BuiltInPagesSettings {
  constructor(public data: BuiltInPageSettingsData) {}
}
