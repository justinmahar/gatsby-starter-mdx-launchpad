import { Location } from '@reach/router';
import * as React from 'react';
import { OpenGraphMetadata, SuperSEO, TwitterSummaryCardType } from 'react-super-seo';
import MdxContent from '../data/MdxContent';
import { LayoutProps } from './layouts/getLayout';

export default function MdxSEO(props: LayoutProps): JSX.Element {
  const mdxContent: MdxContent = props.mdxContent;
  const templateTags = props.templateTags;

  const lang = 'en';

  const seoTitle = templateTags.render(mdxContent.data.frontmatter.seoSettings.seoTitle);
  const seoDescription = templateTags.render(mdxContent.data.frontmatter.seoSettings.seoDescription);
  let seoImageUrl = props.settings.data.site.siteMetadata.siteImage;
  let seoImageWidth = props.settings.data.site.siteMetadata.siteImageWidth;
  let seoImageHeight = props.settings.data.site.siteMetadata.siteImageHeight;
  let seoImageAlt: string | undefined =
    props.settings.data.site.siteMetadata.siteImageAlt !== 'none'
      ? templateTags.render(props.settings.data.site.siteMetadata.siteImageAlt)
      : undefined;

  if (mdxContent.data.frontmatter.seoSettings.seoImage.seoImageSelection === 'custom-image') {
    seoImageUrl = mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImage;
    seoImageWidth = mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageWidth;
    seoImageHeight = mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageHeight;
    seoImageAlt =
      mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageAlt !== 'none'
        ? templateTags.render(mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageAlt)
        : undefined;
  }

  // If the twitter site username is none, set it to undefined.
  const twitterSiteUsername =
    props.settings.data.seoYaml.twitterSiteUsername !== 'none'
      ? props.settings.data.seoYaml.twitterSiteUsername
      : undefined;

  const openGraph: OpenGraphMetadata = {
    ogUrl: typeof window !== 'undefined' ? window.location.href : '',
    ogTitle: seoTitle,
    ogTypeObject: {},
    ogImage: {
      ogImage: seoImageUrl,
      ogImageAlt: seoImageAlt,
      ogImageWidth: seoImageWidth,
      ogImageHeight: seoImageHeight,
    },
    ogDescription: seoDescription,
    ogSiteName: props.settings.data.site.siteMetadata.siteName,
  };
  const twitterCard: TwitterSummaryCardType = {
    summaryCardSiteUsername: twitterSiteUsername,
    summaryCardTitle: seoTitle,
    summaryCardDescription: seoDescription,
    summaryCardImage: seoImageUrl,
    summaryCardImageAlt: seoImageAlt,
  };

  return (
    <Location>
      {(locationProps) => {
        return (
          <SuperSEO
            title={seoTitle}
            description={seoDescription}
            lang={lang}
            openGraph={{
              ...openGraph,
              ogUrl: locationProps.location.href,
            }}
            twitter={{
              twitterSummaryCard: twitterCard,
            }}
          />
        );
      }}
    </Location>
  );
}
