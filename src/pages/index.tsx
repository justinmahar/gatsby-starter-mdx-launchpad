import { Location } from '@reach/router';
import { graphql, Link } from 'gatsby';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import FeaturedPostContainer from '../components/FeaturedPostContainer';
import Layout from '../components/Layout';
import MailingListSignupCard from '../components/MailingListSignupCard';
import MailingListSignupContainer from '../components/MailingListSignupContainer';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import SocialShareComponent from '../components/SocialShareComponent';
import TopBar from '../components/TopBar';
import MdxContent from '../data/MdxContent';
import DiscussionSettings from '../data/settings/DiscussionSettings';
import MailingListSettings from '../data/settings/MailingListSettings';
import PostSettings from '../data/settings/PostSettings';
import SeoSettings from '../data/settings/SeoSettings';
import SocialSharingSettings from '../data/settings/SocialSharingSettings';
import SiteMetadata from '../data/SiteMetadata';
import useMailingList from '../hooks/useMailingList';
import renderTemplateTags from '../util/render-template-tags';

export default function Index(props: {}): JSX.Element {
  const data = props.data;

  console.log('Got it!', props.data.indexMdx);

  const siteMetadata: SiteMetadata = new SiteMetadata(data.site.siteMetadata);
  const seoSettings = new SeoSettings(data.seoYaml);
  const mailingListSettings = new MailingListSettings(data.mailingListYaml);
  const postSettings = new PostSettings(data.postYaml);
  const discussionSettings = new DiscussionSettings(data.discussionYaml);
  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  const mailingList = useMailingList(
    mailingListSettings.data.mailingListFormActionUrl,
    mailingListSettings.data.mailingListAsyncEnabled,
    mailingListSettings.asyncFetchInitOptions
  );

  const indexPagePostCount = postSettings.data.indexPagePostCount;
  const allPostsListSlug = postSettings.data.allPostsListSlug;
  const postCategoryListSlug = postSettings.data.postCategoryListSlug;
  const featuredPostEnabled: boolean = postSettings.data.featuredPost.featuredPostEnabled;
  const featuredPostSlug: string = postSettings.data.featuredPost.featuredPostSlug;

  const posts: MdxContent[] = data.allMdx.nodes
    .map(node => new MdxContent(node))
    .filter((post: MdxContent) => !post.data.frontmatter.hidden);

  const postElements: JSX.Element[] = posts.slice(0, indexPagePostCount).map((post: MdxContent, index: number) => {
    return (
      <PostCard
        key={'post-card-' + index}
        post={post}
        postCategoryListSlug={postCategoryListSlug}
        showCommentCount={discussionSettings.data.siteWideCommentsEnabled}
      />
    );
  });

  // Locate the featured post, if that feature is enabled.
  let featuredPost: MdxContent = null;
  if (featuredPostEnabled) {
    if (postSettings.data.featuredPost.featureNewestPostEnabled) {
      featuredPost = posts[0];
    } else {
      // Find the post that has the same slug as the featured post.
      const featuredPosts = posts.filter((post: MdxContent) => post.data.frontmatter.rawSlug === featuredPostSlug);
      if (featuredPosts.length > 0) {
        featuredPost = featuredPosts[0];
      } else {
        console.error('Featured MDX post not found:', featuredPostSlug);
      }
    }
  }

  // === SEO === === === === === === === ===

  const templateTags = {
    ...siteMetadata.getTemplateTags(),
    ...socialSharingSettings.getTemplateTags(),
    ...seoSettings.getSiteWideTemplateTags(),
    ...seoSettings.getIndexSeoTempateTags(),
    contentTitle: siteMetadata.data.siteName,
    contentExcerpt: siteMetadata.data.siteDescription,
    contentCategory: 'none',
  };

  const lang = siteMetadata.data.siteLanguage;

  const seoTitle = renderTemplateTags(seoSettings.data.indexSeoSettings.seoTitle, templateTags);
  const seoDescription = renderTemplateTags(seoSettings.data.indexSeoSettings.seoDescription, templateTags);
  let seoImageUrl = siteMetadata.data.siteImage;
  let seoImageAlt = siteMetadata.data.siteImageAlt;
  if (seoSettings.data.indexSeoSettings.seoImage.useSiteImage) {
    seoImageUrl = siteMetadata.data.siteImage;
    seoImageAlt =
      siteMetadata.data.siteImageAlt !== 'none'
        ? renderTemplateTags(siteMetadata.data.siteImageAlt, templateTags)
        : undefined;
  } else {
    seoImageUrl = seoSettings.data.indexSeoSettings.seoImage.customSeoImage;
    seoImageAlt =
      seoSettings.data.indexSeoSettings.seoImage.customSeoImageAlt !== 'none'
        ? renderTemplateTags(seoSettings.data.indexSeoSettings.seoImage.customSeoImageAlt, templateTags)
        : undefined;
  }
  const ogTitle = renderTemplateTags(seoSettings.data.indexSeoSettings.openGraph.ogTitle, templateTags);
  const ogDescription = renderTemplateTags(seoSettings.data.indexSeoSettings.openGraph.ogDescription, templateTags);
  let ogImageUrl = seoImageUrl;
  let ogImageAlt = seoImageAlt;
  if (seoSettings.data.indexSeoSettings.openGraph.ogImage.ogUseCustomOgImage) {
    ogImageUrl = seoSettings.data.indexSeoSettings.openGraph.ogImage.ogCustomImage;
    ogImageAlt =
      seoSettings.data.indexSeoSettings.openGraph.ogImage.ogCustomImageAlt !== 'none'
        ? renderTemplateTags(seoSettings.data.indexSeoSettings.openGraph.ogImage.ogCustomImageAlt, templateTags)
        : undefined;
  }
  let twitterSiteUsername =
    seoSettings.data.indexSeoSettings.twitterCards.twitterCardSiteUsername !== 'none'
      ? renderTemplateTags(seoSettings.data.indexSeoSettings.twitterCards.twitterCardSiteUsername, templateTags)
      : undefined;
  // If it was replaced with the site username which is none, set it to undefined.
  twitterSiteUsername = twitterSiteUsername !== 'none' ? twitterSiteUsername : undefined;
  const twitterCardTitle = renderTemplateTags(
    seoSettings.data.indexSeoSettings.twitterCards.twitterCardTitle,
    templateTags
  );
  const twitterCardDescription = renderTemplateTags(
    seoSettings.data.indexSeoSettings.twitterCards.twitterCardDescription,
    templateTags
  );
  let twitterCardImageUrl = seoImageUrl;
  let twitterCardImageAlt = seoImageAlt;
  if (seoSettings.data.indexSeoSettings.twitterCards.twitterCardImage.twitterCardUseCustomImage) {
    twitterCardImageUrl = seoSettings.data.indexSeoSettings.twitterCards.twitterCardImage.twitterCardCustomImage;
    twitterCardImageAlt =
      seoSettings.data.indexSeoSettings.twitterCards.twitterCardImage.twitterCardCustomImageAlt !== 'none'
        ? renderTemplateTags(
            seoSettings.data.indexSeoSettings.twitterCards.twitterCardImage.twitterCardCustomImageAlt,
            templateTags
          )
        : undefined;
  }
  const twitterUseLargeImage: boolean =
    seoSettings.data.indexSeoSettings.twitterCards.twitterCardType === 'summary-card-with-large-image';

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
  const facebookQuote = ogTitle;
  const twitterTitle = twitterCardTitle;
  const twitterVia = twitterSiteUsername;

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

      {/* Only show the featured post if that feature is enabled */}
      {!!featuredPost && (
        <FeaturedPostContainer
          featuredPost={featuredPost}
          contentCueText={postSettings.data.featuredPost.contentCueText}
          titleText={
            postSettings.data.featuredPost.customTitleText !== 'none'
              ? postSettings.data.featuredPost.customTitleText
              : featuredPost.data.frontmatter.title
          }
          teaserText={
            postSettings.data.featuredPost.customTeaser !== 'none'
              ? postSettings.data.featuredPost.customTeaser
              : featuredPost.getExcerpt()
          }
          buttonText={postSettings.data.featuredPost.buttonText}
          leftQuote={postSettings.data.featuredPost.leftQuote}
          rightQuote={postSettings.data.featuredPost.rightQuote}
          featuredImageUrl={
            featuredPost.data.frontmatter.featuredImage.featuredImageEnabled
              ? featuredPost.data.frontmatter.featuredImage.featuredImageUrl
              : siteMetadata.data.siteImage
          }
        />
      )}
      <TopBar />

      <Container className="mt-5 mb-4">
        <Row>
          <Col xs={12} md={8}>
            {postElements}
            <div className="d-flex justify-content-center align-items-center my-4">
              <Link to={`/${allPostsListSlug}`}>
                <Button variant="secondary" size="sm">
                  Browse All Posts &rarr;
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="d-none d-md-block">
              <MailingListSignupCard mailingList={mailingList} />
            </div>
            {socialSharingSettings.data.shareHomePageEnabled &&
              (socialSharingSettings.data.facebook.facebookPostSharingEnabled ||
                socialSharingSettings.data.linkedIn.linkedInPostSharingEnabled ||
                socialSharingSettings.data.twitter.twitterPostSharingEnabled) && (
                <div className="mt-4">
                  <h4 className="mb-2">Share {siteMetadata.data.siteName} with your friends:</h4>
                  <Location>
                    {locationProps => {
                      return (
                        <SocialShareComponent
                          url={locationProps.location.href}
                          facebookQuote={facebookQuote}
                          twitterTitle={twitterTitle}
                          twitterVia={twitterVia}
                        />
                      );
                    }}
                  </Location>
                </div>
              )}
          </Col>
        </Row>
      </Container>
      <MailingListSignupContainer mailingList={mailingList} />
    </Layout>
  );
}

// Settings fragments are in: src/data
export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        ...siteMetadataCommons
      }
    }
    indexMdx: mdx(fields: { slug: { eq: "__index" } }) {
      ...mdxContent
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }, filter: { frontmatter: { group: { eq: "posts" } } }) {
      nodes {
        ...mdxContent
      }
    }
    seoYaml {
      ...seoSettings
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
`;
