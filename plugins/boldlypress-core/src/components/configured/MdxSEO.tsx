import { Location } from '@reach/router';
import * as React from 'react';
import { OpenGraphMetadata, SuperSEO, TwitterSummaryCardType } from 'react-super-seo';
import MdxContent from '../../data/MdxContent';
import { LayoutProps } from '../layouts/getLayout';

export default function MdxSEO(props: LayoutProps): JSX.Element {
  const mdxContent: MdxContent = props.mdxContent;
  const templateTags = props.templateTags;

  const lang = props.settings.data.site.siteMetadata.siteLanguage;

  const seoTitle = templateTags.render(mdxContent.data.frontmatter.seoSettings.seoTitle);
  const seoDescription = templateTags.render(mdxContent.data.frontmatter.seoSettings.seoDescription);
  let seoImageUrl = props.settings.data.site.siteMetadata.siteImage;
  let seoImageAlt = props.settings.data.site.siteMetadata.siteImageAlt;

  switch (mdxContent.data.frontmatter.seoSettings.seoImage.seoImageSelection) {
    case 'featured-image-if-enabled':
      if (mdxContent.data.frontmatter.featuredImage.featuredImageEnabled) {
        seoImageUrl = mdxContent.data.frontmatter.featuredImage.featuredImageUrl;
        seoImageAlt =
          mdxContent.data.frontmatter.featuredImage.featuredImageAlt !== 'none'
            ? templateTags.render(mdxContent.data.frontmatter.featuredImage.featuredImageAlt)
            : undefined;
      }
      break;
    case 'custom-image':
      seoImageUrl = mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImage;
      seoImageAlt =
        mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageAlt !== 'none'
          ? templateTags.render(mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageAlt)
          : undefined;
      break;
    default:
  }

  // If the twitter site username is none, set it to undefined.
  const twitterSiteUsername =
    props.settings.data.socialSharingYaml.twitterSiteUsername !== 'none'
      ? props.settings.data.socialSharingYaml.twitterSiteUsername
      : undefined;

  const openGraph: OpenGraphMetadata = {
    ogTitle: seoTitle,
    ogTypeObject: {},
    ogImage: {
      ogImage: seoImageUrl,
      ogImageAlt: seoImageAlt,
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
