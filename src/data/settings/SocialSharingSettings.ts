import { graphql } from "gatsby"
import { Tags } from "../../util/render-template-tags"

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
    shareHomePageEnabled
    facebook {
      connectViaFacebookEnabled
      connectViaFacebookUrl
      facebookPostSharingEnabled
    }
    twitter {
      connectViaTwitterEnabled
      connectViaTwitterUrl
      twitterPostSharingEnabled
      twitterSiteUsername
    }
    linkedIn {
      linkedInPostSharingEnabled
    }
    email {
      connectViaEmailEnabled
      connectViaEmailUrl
    }
  }
`
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type SocialSharingSettingsData = {
  shareHomePageEnabled: boolean
  facebook: {
    connectViaFacebookEnabled: boolean
    connectViaFacebookUrl: string
    facebookPostSharingEnabled: boolean
  }
  twitter: {
    connectViaTwitterEnabled: boolean
    connectViaTwitterUrl: string
    twitterPostSharingEnabled: boolean
    twitterSiteUsername: string
  }
  linkedIn: {
    linkedInPostSharingEnabled: boolean
  }
  email: {
    connectViaEmailEnabled: boolean
    connectViaEmailUrl: string
  }
}

// === === === === === === === === ===

export default class SocialSharingSettings {
  constructor(public data: SocialSharingSettingsData) { }

  getTemplateTags():Tags {
    return {
      twitterSiteUsername: this.data.twitter.twitterSiteUsername
    }
  }
}