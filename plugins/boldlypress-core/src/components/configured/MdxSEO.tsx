import { Location } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import MdxContent from '../../data/MdxContent';
import SiteSeoSettings from '../../data/settings/SiteSeoSettings';
import SocialSharingSettings from '../../data/settings/SocialSharingSettings';
import SiteMetadata from '../../data/SiteMetadata';
import renderTemplateTags from '../../util/render-template-tags';
import SEO from '../SEO';

export interface MdxSEOProps {
  mdxContent: MdxContent;
  templateTags: { [x: string]: string };
}

export default function MdxSEO(props: MdxSEOProps): JSX.Element {
  const data = useStaticQuery(graphql`
    query PageLayoutQuery {
      site {
        siteMetadata {
          ...siteMetadataCommons
        }
      }
      seoYaml {
        ...siteSeoSettings
      }
      socialSharingYaml {
        ...socialSharingSettings
      }
    }
  `);

  const mdxContent: MdxContent = props.mdxContent;
  const siteMetadata = new SiteMetadata(data.site.siteMetadata);
  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  const templateTags = props.templateTags;

  const lang = siteMetadata.data.siteLanguage;

  const seoTitle = renderTemplateTags(mdxContent.data.frontmatter.seoSettings.seoTitle, templateTags);
  const seoDescription = renderTemplateTags(mdxContent.data.frontmatter.seoSettings.seoDescription, templateTags);
  let seoImageUrl = siteMetadata.data.siteImage;
  let seoImageAlt = siteMetadata.data.siteImageAlt;

  switch (mdxContent.data.frontmatter.seoSettings.seoImage.seoImageSelection) {
    case 'featured-image-if-enabled':
      if (mdxContent.data.frontmatter.featuredImage.featuredImageEnabled) {
        seoImageUrl = mdxContent.data.frontmatter.featuredImage.featuredImageUrl;
        seoImageAlt =
          mdxContent.data.frontmatter.featuredImage.featuredImageAlt !== 'none'
            ? renderTemplateTags(mdxContent.data.frontmatter.featuredImage.featuredImageAlt, templateTags)
            : undefined;
      }
      break;
    case 'custom-image':
      seoImageUrl = mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImage;
      seoImageAlt =
        mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageAlt !== 'none'
          ? renderTemplateTags(mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageAlt, templateTags)
          : undefined;
      break;
    default:
  }

  let twitterSiteUsername = socialSharingSettings.data.twitter.twitterSiteUsername;
  // If the twitter site username is none, set it to undefined.
  twitterSiteUsername = twitterSiteUsername !== 'none' ? twitterSiteUsername : undefined;

  const openGraph = {
    ogTitle: seoTitle,
    ogTypeObject: {},
    ogImage: {
      ogImage: seoImageUrl,
      ogImageAlt: seoImageAlt,
    },
    ogDescription: seoDescription,
    ogSiteName: siteMetadata.data.siteName,
  };
  const twitterCard = {
    summaryCardSiteUsername: twitterSiteUsername,
    summaryCardTitle: seoTitle,
    summaryCardDescription: seoDescription,
    summaryCardImage: seoImageUrl,
    summaryCardImageAlt: seoImageAlt,
  };

  return (
    <Location>
      {locationProps => {
        return (
          <SEO
            pageTitle={seoTitle}
            metaDescription={seoDescription}
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
