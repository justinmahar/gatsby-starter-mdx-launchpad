import { graphql } from 'gatsby';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    discussionYaml {
      ...discussionSettings
    }
  ```
*/
export const discussionYamlQuery = graphql`
  fragment discussionSettings on DiscussionYaml {
    siteWideCommentsEnabled
    disqusShortname
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type DiscussionSettingsData = {
  siteWideCommentsEnabled: boolean;
  disqusShortname: string;
};

// === === === === === === === === ===

export default class DiscussionSettings {
  constructor(public data: DiscussionSettingsData) {}
}
