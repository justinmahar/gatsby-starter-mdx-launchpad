import { graphql } from "gatsby"
import { SeoTwitterCardType } from "./settings/SeoSettings"
import { Tags } from "../util/render-template-tags"

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
  {
    allMdx {
      nodes {
        ...mdxContent
      }
    }
  }
  ```
 */
export const mdxFragmentQuery = graphql`
  fragment mdxContent on Mdx {
    id
    fields {
      slug
      categorySlug
    }
    timeToRead
    excerpt
    frontmatter {
      title
      rawSlug
      date
      category
      customExcerpt
      featuredImage {
        featuredImageEnabled
        featuredImageUrl
        featuredImageAlt
        showTitleSection
        showCardImage
      }
      showTitle
      showSidebar
      hidden
      layout
      dateEnabled
      discussionEnabled
      sharing {
        sharingEnabled
        facebookQuote
        facebookHashtag
        twitterTitle
        twitterVia
        twitterHashtags
      }
      seoSettings {
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
      group
    }
    body
    fileAbsolutePath
  }
`
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type MdxData = {
  id: string
  fields: {
    slug: string
    categorySlug: string
  }
  timeToRead: string
  excerpt: string
  frontmatter: {
    title: string
    rawSlug: string
    date: string
    category: string
    customExcerpt: string
    featuredImage: {
      featuredImageEnabled: boolean
      featuredImageUrl: string
      featuredImageAlt: string
      showTitleSection: boolean
      showCardImage: boolean
    }
    showTitle: boolean
    showSidebar: boolean
    hidden: boolean
    layout: MdxLayout
    dateEnabled: boolean
    discussionEnabled: boolean
    sharing: {
      sharingEnabled: boolean
      facebookQuote: string
      facebookHashtag: string
      twitterTitle: string
      twitterVia: string
      twitterHashtags: string
    }
    seoSettings: {
      openGraph: {
        ogDescription: string
        ogImage: {
          ogCustomImage: string
          ogCustomImageAlt: string
          ogUseCustomOgImage: boolean
        }
        ogTitle: string
      }
      seoDescription: string
      seoImage: {
        customSeoImage: string
        customSeoImageAlt: string
        seoImageSelection: MdxSeoImageSelection
      }
      seoTitle: string
      twitterCards: {
        twitterCardDescription: string
        twitterCardImage: {
          twitterCardCustomImage: string
          twitterCardCustomImageAlt: string
          twitterCardUseCustomImage: boolean
        }
        twitterCardSiteUsername: string
        twitterCardTitle: string
        twitterCardType: MdxSeoTwitterCardType
      }
    }
    group: MdxGroup
  }
  body: string
  fileAbsolutePath: string
}

export type MdxGroup =
  | "posts"
  | "pages"
export type MdxLayout =
  | "post"
  | "page"
  | "index"
  | "category-post-listing"
export type MdxSeoImageSelection =
  | "featured-image-if-enabled"
  | "custom-image"
export type MdxSeoTwitterCardType =
  | "site-wide-twitter-card-type"
  | SeoTwitterCardType

// === === === === === === === === ===

/**
 * `MdxContent` is an MDX page that includes commonly used fields.
 * Use the `...mdxContent` graphql fragment to get all fields needed
 * to construct one. Then pass each MDX node into the constructor.
 */
export default class MdxContent {

  constructor(public data: MdxData) { }

  public getExcerpt(): string {
    return this.data.frontmatter.customExcerpt !== "none" ? this.data.frontmatter.customExcerpt : this.data.excerpt;
  }

  public getTemplateTags(): Tags {
    return {
      contentTitle: this.data.frontmatter.title,
      contentExcerpt: this.getExcerpt(),
      contentCategory: this.data.frontmatter.category,
      contentSeoTitle: this.data.frontmatter.seoSettings.seoTitle,
      contentSeoDescription: this.data.frontmatter.seoSettings.seoDescription,
      contentOgTitle: this.data.frontmatter.seoSettings.openGraph.ogTitle,
      contentOgDescription: this.data.frontmatter.seoSettings.openGraph.ogDescription,
      contentTwitterCardTitle: this.data.frontmatter.seoSettings.twitterCards.twitterCardTitle,
      contentTwitterCardDescription: this.data.frontmatter.seoSettings.twitterCards.twitterCardDescription,
      contentTwitterSiteUsername: this.data.frontmatter.seoSettings.twitterCards.twitterCardSiteUsername,
    }
  }

  public isPost(): boolean {
    return this.data.frontmatter.group === "posts"
  }

  public isPage(): boolean {
    return this.data.frontmatter.group === "pages"
  }

  /**
   * Returns true if this MDX uses the post layout, false otherwise.
   */
  public hasSidebar() {
    return this.data.frontmatter.showSidebar
  }
}