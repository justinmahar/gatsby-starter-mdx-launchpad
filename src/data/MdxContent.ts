import { graphql } from 'gatsby';
import { TemplateTagRenderer } from './TemplateTagRenderer';
import Settings from './useSettings';

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
      slug
      excerpt
      seo {
        title
        description
        imageUrl
        imageWidth
        imageHeight
        imageAlt
      }
      partial
      private
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
    slug?: string;
    excerpt?: string;
    seo?: {
      title?: string;
      description?: string;
      imageUrl?: string;
      imageWidth?: number;
      imageHeight?: number;
      imageAlt?: string;
    };
    partial?: string;
    private?: string;
  };
  body: string;
  fileAbsolutePath: string;
};

// === === === === === === === === ===

/**
 * `MdxContent` is MDX content that includes frontmatter and commonly used fields.
 * Use the `...mdxContent` graphql fragment to get all fields needed
 * to construct one. Then pass each MDX node into the constructor.
 */
export default class MdxContent {
  constructor(public data: MdxData) { }

  public getExcerpt(): string {
    return this.data.frontmatter.excerpt !== 'none' ? this.data.frontmatter.excerpt : this.data.excerpt;
  }

  public getTemplateTagRenderer(): TemplateTagRenderer {
    return new TemplateTagRenderer({
      contentTitle: this.data.frontmatter.title,
      contentExcerpt: this.getExcerpt(),
      contentSeoTitle: this.data.frontmatter.seo.title
        ? this.data.frontmatter.seo.title
        : this.data.frontmatter.title,
      contentSeoDescription: this.data.frontmatter.seo.description
        ? this.data.frontmatter.seo.description
        : this.getExcerpt(),
    });
  }
}
