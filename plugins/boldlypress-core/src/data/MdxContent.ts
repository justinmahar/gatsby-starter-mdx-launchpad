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
    }
    timeToRead
    excerpt
    frontmatter {
      title
      rawSlug
      customExcerpt
      options {
        hidden
        unlisted
        layout
      }
      seoSettings {
        seoConfigurationId
        seoTitle
        seoDescription
        seoImage {
          customSeoImage
          customSeoImageWidth
          customSeoImageHeight
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
  };
  timeToRead: string;
  excerpt: string;
  frontmatter: {
    title: string;
    rawSlug: string;
    customExcerpt: string;
    options: {
      hidden: boolean;
      unlisted: boolean;
      layout: string;
    };
    seoSettings: {
      seoConfigurationId: string;
      seoTitle: string;
      seoDescription: string;
      seoImage: {
        customSeoImage: string;
        customSeoImageWidth: number;
        customSeoImageHeight: number;
        customSeoImageAlt: string;
        seoImageSelection: MdxSeoImageSelection;
      };
    };
    group: 'pages' | 'builtin';
  };
  body: string;
  fileAbsolutePath: string;
};

export type MdxSeoImageSelection = 'site-image' | 'custom-image';

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
      twitterSiteUsername: settings.data.seoYaml.twitterSiteUsername,
      seoTitleSeparator: settings.data.seoYaml.seoTitleSeparator,
      configSeoTitle: foundConfiguration ? foundConfiguration.seoTitle : `[SEO config not found: ${configurationId}]`,
      configSeoDescription: foundConfiguration
        ? foundConfiguration.seoDescription
        : `[SEO config not found: ${configurationId}]`,
      contentTitle: this.data.frontmatter.title,
      contentExcerpt: this.getExcerpt(),
      contentSeoTitle: this.data.frontmatter.seoSettings.seoTitle,
      contentSeoDescription: this.data.frontmatter.seoSettings.seoDescription,
      ...overriddenTags,
    });
  }
}
