import { Location } from '@reach/router';
import { graphql, Link, useStaticQuery } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import moment from 'moment';
import * as React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import MdxContent, { MdxSeoTwitterCardType } from '../../data/MdxContent';
import DiscussionSettings from '../../data/settings/DiscussionSettings';
import MailingListSettings from '../../data/settings/MailingListSettings';
import PostSettings from '../../data/settings/PostSettings';
import SiteSeoSettings from '../../data/settings/SiteSeoSettings';
import SocialSharingSettings from '../../data/settings/SocialSharingSettings';
import SiteMetadata from '../../data/SiteMetadata';
import useMailingList from '../../hooks/useMailingList';
import renderTemplateTags from '../../util/render-template-tags';
import DiscussionComponent from '../DiscussionComponent';
import ImageHeaderContainer from '../ImageHeaderContainer';
import Layout from '../Layout';
import MailingListSignupCard from '../MailingListSignupCard';
import MailingListSignupContainer from '../MailingListSignupContainer';
import RecentPostsWidget from '../RecentPostsWidget';
import SEO from '../SEO';
import SocialShareComponent from '../SocialShareComponent';
import TopBar from '../TopBar';

export interface PageLayoutProps {
  mdxContent: MdxContent;
  modelMdxContent?: MdxContent;
}

export default function PageLayout(props: PageLayoutProps): JSX.Element {
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
      mailingListYaml {
        ...mailingListSettings
      }
      postYaml {
        ...postSettings
      }
      discussionYaml {
        ...discussionSettings
      }
      socialSharingYaml {
        ...socialSharingSettings
      }
    }
  `);

  if (!props.mdxContent) {
    return <p>No MDX content was provided.</p>;
  }

  const mdxContent: MdxContent = props.mdxContent;
  const siteMetadata = new SiteMetadata(data.site.siteMetadata);
  const siteSeoSettings = new SiteSeoSettings(data.seoYaml);
  const mailingListSettings = new MailingListSettings(data.mailingListYaml);
  const discussionSettings = new DiscussionSettings(data.discussionYaml);
  const postSettings = new PostSettings(data.postYaml);
  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  const postCategoryListSlug = postSettings.data.postCategoryListSlug;

  const mailingList = useMailingList(
    mailingListSettings.data.mailingListFormActionUrl,
    mailingListSettings.data.mailingListAsyncEnabled,
    mailingListSettings.asyncFetchInitOptions
  );

  const showSidebar: boolean = mdxContent.hasSidebar();

  // === SEO === === === === === === === ===

  const templateTags = {
    ...siteMetadata.getTemplateTags(),
    ...socialSharingSettings.getTemplateTags(),
    ...siteSeoSettings.getSiteWideTemplateTags(),
    ...mdxContent.getTemplateTags(),
  };

  const lang = siteMetadata.data.siteLanguage;

  const contentTitle = renderTemplateTags(mdxContent.data.frontmatter.title, templateTags);
  const seoTitle = renderTemplateTags(mdxContent.data.frontmatter.seoSettings.seoTitle, templateTags);
  const seoDescription = renderTemplateTags(mdxContent.data.frontmatter.seoSettings.seoDescription, templateTags);
  let seoImageUrl = siteMetadata.data.siteImage;
  let seoImageAlt = siteMetadata.data.siteImageAlt;
  if (mdxContent.data.frontmatter.seoSettings.seoImage.seoImageSelection === 'featured-image-if-enabled') {
    if (mdxContent.data.frontmatter.featuredImage.featuredImageEnabled) {
      seoImageUrl = mdxContent.data.frontmatter.featuredImage.featuredImageUrl;
      seoImageAlt =
        mdxContent.data.frontmatter.featuredImage.featuredImageAlt !== 'none'
          ? renderTemplateTags(mdxContent.data.frontmatter.featuredImage.featuredImageAlt, templateTags)
          : undefined;
    } else {
      if (mdxContent.isPost()) {
        if (siteSeoSettings.data.siteWidePostSeoSettings.seoImage.useSiteImage) {
          seoImageUrl = siteMetadata.data.siteImage;
          seoImageAlt =
            siteMetadata.data.siteImageAlt !== 'none'
              ? renderTemplateTags(siteMetadata.data.siteImageAlt, templateTags)
              : undefined;
        } else {
          seoImageUrl = siteSeoSettings.data.siteWidePostSeoSettings.seoImage.customSeoImage;
          seoImageAlt =
            siteSeoSettings.data.siteWidePostSeoSettings.seoImage.customSeoImageAlt !== 'none'
              ? renderTemplateTags(
                  siteSeoSettings.data.siteWidePostSeoSettings.seoImage.customSeoImageAlt,
                  templateTags
                )
              : undefined;
        }
      } else if (mdxContent.isPage()) {
        if (siteSeoSettings.data.siteWidePageSeoSettings.seoImage.useSiteImage) {
          seoImageUrl = siteMetadata.data.siteImage;
          seoImageAlt =
            siteMetadata.data.siteImageAlt !== 'none'
              ? renderTemplateTags(siteMetadata.data.siteImageAlt, templateTags)
              : undefined;
        } else {
          seoImageUrl = siteSeoSettings.data.siteWidePageSeoSettings.seoImage.customSeoImage;
          seoImageAlt =
            siteSeoSettings.data.siteWidePageSeoSettings.seoImage.customSeoImageAlt !== 'none'
              ? renderTemplateTags(
                  siteSeoSettings.data.siteWidePageSeoSettings.seoImage.customSeoImageAlt,
                  templateTags
                )
              : undefined;
        }
      }
    }
  } else {
    seoImageUrl = mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImage;
    seoImageAlt =
      mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageAlt !== 'none'
        ? renderTemplateTags(mdxContent.data.frontmatter.seoSettings.seoImage.customSeoImageAlt, templateTags)
        : undefined;
  }

  const ogTitle = renderTemplateTags(mdxContent.data.frontmatter.seoSettings.openGraph.ogTitle, templateTags);
  const ogDescription = renderTemplateTags(
    mdxContent.data.frontmatter.seoSettings.openGraph.ogDescription,
    templateTags
  );
  let ogImageUrl = seoImageUrl;
  let ogImageAlt = seoImageAlt;
  if (mdxContent.data.frontmatter.seoSettings.openGraph.ogImage.ogUseCustomOgImage) {
    ogImageUrl = mdxContent.data.frontmatter.seoSettings.openGraph.ogImage.ogCustomImage;
    ogImageAlt =
      mdxContent.data.frontmatter.seoSettings.openGraph.ogImage.ogCustomImageAlt !== 'none'
        ? renderTemplateTags(mdxContent.data.frontmatter.seoSettings.openGraph.ogImage.ogCustomImageAlt, templateTags)
        : undefined;
  }
  let twitterSiteUsername =
    mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardSiteUsername !== 'none'
      ? renderTemplateTags(mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardSiteUsername, templateTags)
      : undefined;
  // If it was replaced with the site username which is none, set it to undefined.
  twitterSiteUsername = twitterSiteUsername !== 'none' ? twitterSiteUsername : undefined;
  const twitterCardTitle = renderTemplateTags(
    mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardTitle,
    templateTags
  );
  const twitterCardDescription = renderTemplateTags(
    mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardDescription,
    templateTags
  );
  let twitterCardImageUrl = seoImageUrl;
  let twitterCardImageAlt = seoImageAlt;
  if (mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardImage.twitterCardUseCustomImage) {
    twitterCardImageUrl = mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardImage.twitterCardCustomImage;
    twitterCardImageAlt =
      mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardImage.twitterCardCustomImageAlt !== 'none'
        ? renderTemplateTags(
            mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardImage.twitterCardCustomImageAlt,
            templateTags
          )
        : undefined;
  }
  let twitterUseLargeImage: boolean =
    mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardType === 'summary-card-with-large-image';
  const postTwitterCardType: MdxSeoTwitterCardType =
    mdxContent.data.frontmatter.seoSettings.twitterCards.twitterCardType;
  if (postTwitterCardType === 'site-wide-twitter-card-type') {
    if (mdxContent.isPost()) {
      twitterUseLargeImage =
        siteSeoSettings.data.siteWidePostSeoSettings.twitterCards.twitterCardType === 'summary-card-with-large-image';
    } else if (mdxContent.isPage()) {
      twitterUseLargeImage =
        siteSeoSettings.data.siteWidePageSeoSettings.twitterCards.twitterCardType === 'summary-card-with-large-image';
    }
  }

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

  // Sharing buttons
  const facebookQuote =
    mdxContent.data.frontmatter.sharing.facebookQuote !== 'none'
      ? renderTemplateTags(mdxContent.data.frontmatter.sharing.facebookQuote, templateTags)
      : undefined;
  const facebookHashtag =
    mdxContent.data.frontmatter.sharing.facebookHashtag !== 'none'
      ? mdxContent.data.frontmatter.sharing.facebookHashtag.startsWith('#')
        ? mdxContent.data.frontmatter.sharing.facebookHashtag
        : '#' + mdxContent.data.frontmatter.sharing.facebookHashtag
      : undefined;
  const twitterTitle =
    mdxContent.data.frontmatter.sharing.twitterTitle !== 'none'
      ? renderTemplateTags(mdxContent.data.frontmatter.sharing.twitterTitle, templateTags)
      : undefined;
  const twitterVia =
    mdxContent.data.frontmatter.sharing.twitterVia !== 'none'
      ? renderTemplateTags(mdxContent.data.frontmatter.sharing.twitterVia, templateTags)
      : undefined;
  // Create an array of twitter hashtags
  const twitterHashtagArray =
    mdxContent.data.frontmatter.sharing.twitterHashtags !== 'none'
      ? mdxContent.data.frontmatter.sharing.twitterHashtags
          .split(/\s+/)
          .filter((hashtag: string) => hashtag.length > 0)
          .map((hashtag: string) => (hashtag.startsWith('#') ? hashtag : '#' + hashtag))
      : undefined;

  // === End SEO === === === === === === === ===

  return (
    <>
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
      <Layout>
        {!!mdxContent.data.frontmatter.featuredImage.featuredImageEnabled &&
          !!mdxContent.data.frontmatter.featuredImage.featuredImageUrl &&
          mdxContent.data.frontmatter.featuredImage.showTitleSection && (
            <ImageHeaderContainer
              title={mdxContent.data.frontmatter.title}
              featuredImage={mdxContent.data.frontmatter.featuredImage.featuredImageUrl}
            />
          )}
        <TopBar />
        <a
          id="content"
          style={{
            display: 'block',
            position: 'relative',
            top: '-50px',
            visibility: 'hidden',
          }}
        />
        <Container className="mt-5 mb-4">
          <Row>
            <Col lg={{ span: 8, offset: showSidebar ? 0 : 2 }}>
              <div className="mb-4" style={{ fontSize: '120%' }}>
                <Card className="primary">
                  {!!mdxContent.data.frontmatter.featuredImage.featuredImageEnabled &&
                    !!mdxContent.data.frontmatter.featuredImage.featuredImageUrl &&
                    mdxContent.data.frontmatter.featuredImage.showCardImage && (
                      <Card.Img
                        variant="top"
                        src={mdxContent.data.frontmatter.featuredImage.featuredImageUrl}
                        alt={
                          mdxContent.data.frontmatter.featuredImage.featuredImageAlt !== 'none'
                            ? mdxContent.data.frontmatter.featuredImage.featuredImageAlt
                            : undefined
                        }
                      />
                    )}
                  <Card.Body>
                    {mdxContent.data.frontmatter.showTitle && (
                      <Card.Title>
                        <h1>{contentTitle}</h1>
                      </Card.Title>
                    )}
                    {((!!mdxContent.data.frontmatter.dateEnabled && !!mdxContent.data.frontmatter.date) ||
                      mdxContent.data.fields.categorySlug !== 'none') && (
                      <Card.Text>
                        Posted
                        {!!mdxContent.data.frontmatter.dateEnabled && !!mdxContent.data.frontmatter.date && (
                          <>
                            {' on '}
                            {moment(mdxContent.data.frontmatter.date).format('MMMM Do, YYYY')}
                          </>
                        )}
                        {mdxContent.data.fields.categorySlug !== 'none' && (
                          <>
                            {' in '}
                            <Link to={`/${postCategoryListSlug}/${mdxContent.data.fields.categorySlug}`}>
                              {mdxContent.data.frontmatter.category}
                            </Link>
                          </>
                        )}
                      </Card.Text>
                    )}
                    <MDXRenderer scope={undefined} components={undefined}>
                      {mdxContent.data.body}
                    </MDXRenderer>
                  </Card.Body>
                </Card>
              </div>
              {!!mdxContent.data.frontmatter.sharing.sharingEnabled &&
                (socialSharingSettings.data.facebook.facebookPostSharingEnabled ||
                  socialSharingSettings.data.linkedIn.linkedInPostSharingEnabled ||
                  socialSharingSettings.data.twitter.twitterPostSharingEnabled) && (
                  <div className="mb-4">
                    <Card className="secondary">
                      <Card.Body>
                        <Card.Title>
                          <h3 className="mb-2">Share it:</h3>
                        </Card.Title>
                        <Location>
                          {locationProps => {
                            return (
                              <SocialShareComponent
                                url={locationProps.location.href}
                                facebookQuote={facebookQuote}
                                facebookHashtag={facebookHashtag}
                                twitterTitle={twitterTitle}
                                twitterVia={twitterVia}
                                twitterHashtags={twitterHashtagArray}
                              />
                            );
                          }}
                        </Location>
                      </Card.Body>
                    </Card>
                  </div>
                )}
            </Col>
            {showSidebar && (
              <Col md={{ span: 4 }}>
                <div className="d-none d-md-block mb-4">
                  <MailingListSignupCard mailingList={mailingList} />
                </div>
                <div className="mb-4">
                  <RecentPostsWidget />
                </div>
                {!!mdxContent.data.frontmatter.sharing.sharingEnabled &&
                  (socialSharingSettings.data.facebook.facebookPostSharingEnabled ||
                    socialSharingSettings.data.linkedIn.linkedInPostSharingEnabled ||
                    socialSharingSettings.data.twitter.twitterPostSharingEnabled) && (
                    <div className="d-none d-md-block">
                      <h3 className="mb-2">Share it:</h3>
                      <Location>
                        {locationProps => {
                          return (
                            <SocialShareComponent
                              url={locationProps.location.href}
                              facebookQuote={facebookQuote}
                              facebookHashtag={facebookHashtag}
                              twitterTitle={twitterTitle}
                              twitterVia={twitterVia}
                              twitterHashtags={twitterHashtagArray}
                            />
                          );
                        }}
                      </Location>
                    </div>
                  )}
              </Col>
            )}
          </Row>
        </Container>
        {!!discussionSettings.data.siteWideCommentsEnabled && !!mdxContent.data.frontmatter.discussionEnabled && (
          <Container className="pb-5">
            <Row>
              <Col md={{ span: showSidebar ? 12 : 8, offset: showSidebar ? 0 : 2 }}>
                <Card className="secondary">
                  <Card.Body>
                    <Card.Title>
                      <h3 className="mb-2">Leave a comment:</h3>
                    </Card.Title>
                    <DiscussionComponent
                      title={contentTitle}
                      identifier={mdxContent.data.fields.slug}
                      shortname={discussionSettings.data.disqusShortname}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
        <MailingListSignupContainer mailingList={mailingList} />
      </Layout>
    </>
  );
}
