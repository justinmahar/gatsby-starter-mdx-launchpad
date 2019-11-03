import { graphql } from "gatsby"
import { Tags } from "../util/render-template-tags"

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
  {
    site {
      siteMetadata {
        ...siteMetadataCommons
      }
    }
  }
  ```
 */
export const siteMetadataFragmentQuery = graphql`
  fragment siteMetadataCommons on SiteSiteMetadata {
    siteName
    siteDescription
    siteImage
    siteImageAlt
    siteIcon
    siteIconAlt
    siteLanguage
    siteUrl
  }
`
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type SiteMetadataCommonsData = {
  siteName: string
  siteDescription: string
  siteImage: string
  siteImageAlt: string
  siteIcon: string
  siteIconAlt: string
  siteLanguage: string
  siteUrl: string
}

// === === === === === === === === ===

/**
 * A `SiteMetadata` contains commonly used site metadata defined in gatsby-config.js.
 * Use the `...siteMetadataCommons` graphql fragment to get all fields needed
 * to construct one. Then pass the data into the constructor.
 */
export default class SiteMetadata {

  constructor(public data: SiteMetadataCommonsData) {
    // Remove trailing slash
    this.data.siteUrl = (this.data.siteUrl as string).replace(/(.*)[/]+$/, "$1")
  }

  getTemplateTags():Tags {
    return {
      siteName: this.data.siteName,
      siteDescription: this.data.siteDescription
    }
  }

  replaceTemplateTags(templateString: string) {
    return templateString
      .replace("{siteName}", this.data.siteName)
      .replace("{siteDescription}", this.data.siteDescription)
      .replace("{siteImage}", this.data.siteImage)
      .replace("{siteIcon}", this.data.siteIcon)
      .replace("{siteLanguage}", this.data.siteLanguage)
      .replace("{siteUrl}", this.data.siteUrl)
  }
}