import { graphql } from 'gatsby';
import { Tags } from '../../util/render-template-tags';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    socialSharingYaml {
      ...socialSharingSettings
    }
  ```
*/
export const socialSharingYamlQuery = graphql`
  fragment socialSharingSettings on SocialSharingYaml {
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
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type SocialSharingSettingsData = {
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

// === === === === === === === === ===

export default class SocialSharingSettings {
  constructor(public data: SocialSharingSettingsData) {}

  getTemplateTags(): Tags {
    return {
      twitterSiteUsername: this.data.twitterSiteUsername,
    };
  }
}
