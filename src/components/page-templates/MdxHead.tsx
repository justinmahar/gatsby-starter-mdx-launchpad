import * as React from 'react';
import MdxContent from '../../data/MdxContent';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Head from '../layouts/Head';

export interface MdxHeadProps {
  mdxContent: MdxContent;
  children?: React.ReactNode;
}

export default function MdxHead(props: MdxHeadProps): JSX.Element {
  const mdxContent: MdxContent = props.mdxContent;

  const seoDescription: string | undefined =
    mdxContent.data.frontmatter.seo?.description && mdxContent.data.frontmatter.seo.description !== 'none'
      ? mdxContent.data.frontmatter.seo.description
      : mdxContent.getExcerpt();
  const seoImageUrl: string | undefined =
    mdxContent.data.frontmatter.seo?.imageUrl && mdxContent.data.frontmatter.seo.imageUrl !== 'none'
      ? mdxContent.data.frontmatter.seo.imageUrl
      : undefined;
  const seoImageWidth: number | undefined = mdxContent.data.frontmatter.seo?.imageWidth;
  const seoImageHeight: number | undefined = mdxContent.data.frontmatter.seo?.imageHeight;
  const seoImageAlt: string | undefined =
    mdxContent.data.frontmatter.seo?.imageAlt && mdxContent.data.frontmatter.seo.imageAlt !== 'none'
      ? mdxContent.data.frontmatter.seo.imageAlt
      : undefined;

  const mdxTemplateTagRenderer: TemplateTagRenderer = mdxContent.getTemplateTagRenderer();

  return (
    <Head
      seo={{
        description: seoDescription,
        imageUrl: seoImageUrl,
        imageWidth: seoImageWidth,
        imageHeight: seoImageHeight,
        imageAlt: seoImageAlt,
      }}
      templateTagRenderer={mdxTemplateTagRenderer}
    >
      {props.children}
    </Head>
  );
}
