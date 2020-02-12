import { Location } from '@reach/router';
import { graphql, Link } from 'gatsby';
import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import ImageHeaderContainer from '../components/ImageHeaderContainer';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TopBar from '../components/TopBar';
import BuiltInPagesSettings from '../data/settings/BuiltInPagesSettings';
import SiteSeoSettings from '../data/settings/SiteSeoSettings';
import SocialSharingSettings from '../data/settings/SocialSharingSettings';
import SiteMetadata from '../data/SiteMetadata';
import renderTemplateTags from '../util/render-template-tags';

interface NotFoundProps {
  data: any;
}

export default function NotFound(props: NotFoundProps): JSX.Element {
  const data = props.data;
  const socialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);
  const siteMetadata = new SiteMetadata(data.site.siteMetadata);
  const siteSeoSettings = new SiteSeoSettings(data.seoYaml);
  const builtInPagesSettings = new BuiltInPagesSettings(data.builtInPagesYaml);

  // === SEO === === === === === === === ===

  const templateTags = {
    ...siteMetadata.getTemplateTags(),
    ...socialSharingSettings.getTemplateTags(),
    ...siteSeoSettings.getSiteWideTemplateTags(),
    ...siteSeoSettings.getNotFoundPageSeoTempateTags(),
    ...builtInPagesSettings.getNotFoundTemplateTags(),
    contentExcerpt: siteSeoSettings.data.notFoundPageSeoSettings.seoDescription,
    contentCategory: 'none',
  };

  const lang = siteMetadata.data.siteLanguage;

  const contentTitle = renderTemplateTags(builtInPagesSettings.data.notFoundPageSettings.contentTitle, templateTags);
  const seoTitle = renderTemplateTags(siteSeoSettings.data.notFoundPageSeoSettings.seoTitle, templateTags);
  const seoDescription = renderTemplateTags(siteSeoSettings.data.notFoundPageSeoSettings.seoDescription, templateTags);
  let seoImageUrl = siteMetadata.data.siteImage;
  let seoImageAlt = siteMetadata.data.siteImageAlt;
  if (siteSeoSettings.data.notFoundPageSeoSettings.seoImage.seoImageSelection === 'featured-image-if-enabled') {
    if (builtInPagesSettings.data.notFoundPageSettings.featuredImage.featuredImageEnabled) {
      seoImageUrl = builtInPagesSettings.data.notFoundPageSettings.featuredImage.featuredImageUrl;
      seoImageAlt =
        builtInPagesSettings.data.notFoundPageSettings.featuredImage.featuredImageAlt !== 'none'
          ? renderTemplateTags(
              builtInPagesSettings.data.notFoundPageSettings.featuredImage.featuredImageAlt,
              templateTags
            )
          : undefined;
    } else {
      seoImageUrl = siteMetadata.data.siteImage;
      seoImageAlt =
        siteMetadata.data.siteImageAlt !== 'none'
          ? renderTemplateTags(siteMetadata.data.siteImageAlt, templateTags)
          : undefined;
    }
  } else {
    seoImageUrl = siteSeoSettings.data.notFoundPageSeoSettings.seoImage.customSeoImage;
    seoImageAlt =
      siteSeoSettings.data.notFoundPageSeoSettings.seoImage.customSeoImageAlt !== 'none'
        ? renderTemplateTags(siteSeoSettings.data.notFoundPageSeoSettings.seoImage.customSeoImageAlt, templateTags)
        : undefined;
  }

  const ogTitle = renderTemplateTags(siteSeoSettings.data.notFoundPageSeoSettings.openGraph.ogTitle, templateTags);
  const ogDescription = renderTemplateTags(
    siteSeoSettings.data.notFoundPageSeoSettings.openGraph.ogDescription,
    templateTags
  );
  let ogImageUrl = seoImageUrl;
  let ogImageAlt = seoImageAlt;
  if (siteSeoSettings.data.notFoundPageSeoSettings.openGraph.ogImage.ogUseCustomOgImage) {
    ogImageUrl = siteSeoSettings.data.notFoundPageSeoSettings.openGraph.ogImage.ogCustomImage;
    ogImageAlt =
      siteSeoSettings.data.notFoundPageSeoSettings.openGraph.ogImage.ogCustomImageAlt !== 'none'
        ? renderTemplateTags(
            siteSeoSettings.data.notFoundPageSeoSettings.openGraph.ogImage.ogCustomImageAlt,
            templateTags
          )
        : undefined;
  }
  let twitterSiteUsername =
    siteSeoSettings.data.notFoundPageSeoSettings.twitterCards.twitterCardSiteUsername !== 'none'
      ? renderTemplateTags(
          siteSeoSettings.data.notFoundPageSeoSettings.twitterCards.twitterCardSiteUsername,
          templateTags
        )
      : undefined;
  // If it was replaced with the site username which is none, set it to undefined.
  twitterSiteUsername = twitterSiteUsername !== 'none' ? twitterSiteUsername : undefined;
  const twitterCardTitle = renderTemplateTags(
    siteSeoSettings.data.notFoundPageSeoSettings.twitterCards.twitterCardTitle,
    templateTags
  );
  const twitterCardDescription = renderTemplateTags(
    siteSeoSettings.data.notFoundPageSeoSettings.twitterCards.twitterCardDescription,
    templateTags
  );
  let twitterCardImageUrl = seoImageUrl;
  let twitterCardImageAlt = seoImageAlt;
  if (siteSeoSettings.data.notFoundPageSeoSettings.twitterCards.twitterCardImage.twitterCardUseCustomImage) {
    twitterCardImageUrl =
      siteSeoSettings.data.notFoundPageSeoSettings.twitterCards.twitterCardImage.twitterCardCustomImage;
    twitterCardImageAlt =
      siteSeoSettings.data.notFoundPageSeoSettings.twitterCards.twitterCardImage.twitterCardCustomImageAlt !== 'none'
        ? renderTemplateTags(
            siteSeoSettings.data.notFoundPageSeoSettings.twitterCards.twitterCardImage.twitterCardCustomImageAlt,
            templateTags
          )
        : undefined;
  }
  const twitterUseLargeImage: boolean =
    siteSeoSettings.data.notFoundPageSeoSettings.twitterCards.twitterCardType === 'summary-card-with-large-image';

  const openGraph = {
    ogTitle: ogTitle,
    ogTypeObject: {},
    ogImage: {
      ogImage: ogImageUrl,
      ogImageAlt: ogImageAlt,
    },
    ogDescription: ogDescription,
    ogSiteName: siteMetadata.data.siteName,
  };
  const twitterCard = {
    summaryCardSiteUsername: twitterSiteUsername,
    summaryCardTitle: twitterCardTitle,
    summaryCardDescription: twitterCardDescription,
    summaryCardImage: twitterCardImageUrl,
    summaryCardImageAlt: twitterCardImageAlt,
  };
  // === End SEO === === === === === === === ===

  return (
    <Layout>
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
                twitterSummaryCard: twitterUseLargeImage ? undefined : twitterCard,
                twitterSummaryCardWithLargeImage: twitterUseLargeImage ? twitterCard : undefined,
              }}
            />
          );
        }}
      </Location>
      {builtInPagesSettings.data.notFoundPageSettings.featuredImage.featuredImageEnabled && (
        <ImageHeaderContainer
          title={contentTitle}
          featuredImage={builtInPagesSettings.data.notFoundPageSettings.featuredImage.featuredImageUrl}
        />
      )}
      <TopBar />
      <Container className="mt-5 mb-4 text-center">
        <h1>{builtInPagesSettings.data.notFoundPageSettings.headline}</h1>
        <h5 className="my-4">{builtInPagesSettings.data.notFoundPageSettings.bodyText}</h5>
        <Row className="my-5">
          <Col md={{ span: 4, offset: 4 }}>
            <Image
              className="w-100"
              src={builtInPagesSettings.data.notFoundPageSettings.bodyImage}
              alt={builtInPagesSettings.data.notFoundPageSettings.bodyImageAlt}
              thumbnail
            />
          </Col>
        </Row>
        <div>
          <Link to={builtInPagesSettings.data.notFoundPageSettings.buttonUrl}>
            <Button variant="outline-primary">{builtInPagesSettings.data.notFoundPageSettings.buttonText}</Button>
          </Link>
        </div>
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        ...siteMetadataCommons
      }
    }
    seoYaml {
      ...siteSeoSettings
    }
    builtInPagesYaml {
      ...builtInPagesSettings
    }
    socialSharingYaml {
      ...socialSharingSettings
    }
  }
`;
