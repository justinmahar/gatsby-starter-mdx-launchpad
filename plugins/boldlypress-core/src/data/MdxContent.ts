import { graphql } from 'gatsby';
import { TemplateTags } from './TemplateTags';
import Settings, { SeoConfiguration } from './useSettings';

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
      options {
        dateEnabled
        discussionEnabled
        hidden
        unlisted
        showTitle
        layout
      }
      sharing {
        sharingEnabled
        facebookQuote
        facebookHashtag
        twitterTitle
        twitterVia
        twitterHashtags
      }
      seoSettings {
        seoConfigurationId
        seoTitle
        seoDescription
        seoImage {
          customSeoImage
          customSeoImageAlt
          seoImageSelection
        }
      }
      group
    }
    body
    fileAbsolutePath
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type MdxData = {
  id: string;
  fields: {
    slug: string;
    categorySlug: string;
  };
  timeToRead: string;
  excerpt: string;
  frontmatter: {
    title: string;
    rawSlug: string;
    date: string;
    category: string;
    customExcerpt: string;
    featuredImage: {
      featuredImageEnabled: boolean;
      featuredImageUrl: string;
      featuredImageAlt: string;
      showTitleSection: boolean;
      showCardImage: boolean;
    };
    options: {
      dateEnabled: boolean;
      discussionEnabled: boolean;
      hidden: boolean;
      unlisted: boolean;
      showTitle: boolean;
      layout: string;
    };
    sharing: {
      sharingEnabled: boolean;
      facebookQuote: string;
      facebookHashtag: string;
      twitterTitle: string;
      twitterVia: string;
      twitterHashtags: string;
    };
    seoSettings: {
      seoConfigurationId: string;
      seoTitle: string;
      seoDescription: string;
      seoImage: {
        customSeoImage: string;
        customSeoImageAlt: string;
        seoImageSelection: MdxSeoImageSelection;
      };
    };
    group: MdxGroup;
  };
  body: string;
  fileAbsolutePath: string;
};

export type MdxGroup = 'posts' | 'pages';
export type MdxSeoImageSelection = 'site-image' | 'featured-image-if-enabled' | 'custom-image';

// === === === === === === === === ===

/**
 * `MdxContent` is an MDX page that includes commonly used fields.
 * Use the `...mdxContent` graphql fragment to get all fields needed
 * to construct one. Then pass each MDX node into the constructor.
 */
export default class MdxContent {
  constructor(public data: MdxData) {}

  public getExcerpt(): string {
    return this.data.frontmatter.customExcerpt !== 'none' ? this.data.frontmatter.customExcerpt : this.data.excerpt;
  }

  public getTemplateTags(settings: Settings, overriddenTags: { [key: string]: string } = {}): TemplateTags {
    const configurationId: string = this.data.frontmatter.seoSettings.seoConfigurationId;
    const foundConfiguration: SeoConfiguration | undefined = settings.data.seoYaml.seoConfigurations.find(
      (value: SeoConfiguration): boolean => {
        return value.seoConfigurationId === configurationId;
      }
    );

    if (!foundConfiguration) {
      console.error(`Config ID ${configurationId} not found`);
    }

    return new TemplateTags({
      year: `${new Date().getFullYear()}`,
      siteName: settings.data.site.siteMetadata.siteName,
      siteDescription: settings.data.site.siteMetadata.siteDescription,
      twitterSiteUsername: settings.data.socialSharingYaml.twitterSiteUsername,
      seoTitleSeparator: settings.data.seoYaml.seoTitleSeparator,
      configSeoTitle: foundConfiguration ? foundConfiguration.seoTitle : `[SEO config not found: ${configurationId}]`,
      configSeoDescription: foundConfiguration
        ? foundConfiguration.seoDescription
        : `[SEO config not found: ${configurationId}]`,
      contentTitle: this.data.frontmatter.title,
      contentExcerpt: this.getExcerpt(),
      contentCategory: this.data.frontmatter.category,
      contentSeoTitle: this.data.frontmatter.seoSettings.seoTitle,
      contentSeoDescription: this.data.frontmatter.seoSettings.seoDescription,
      ...overriddenTags,
    });
  }

  public isPost(): boolean {
    return this.data.frontmatter.group === 'posts';
  }

  public isPage(): boolean {
    return this.data.frontmatter.group === 'pages';
  }
}
