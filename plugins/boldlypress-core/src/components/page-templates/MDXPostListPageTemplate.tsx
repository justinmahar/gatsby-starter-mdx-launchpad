import { Location } from '@reach/router';
import * as React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import MdxContent from '../../data/MdxContent';
import BuiltInPagesSettings from '../../data/settings/BuiltInPagesSettings';
import DiscussionSettings from '../../data/settings/DiscussionSettings';
import MailingListSettings from '../../data/settings/MailingListSettings';
import PostSettings from '../../data/settings/PostSettings';
import SiteSeoSettings from '../../data/settings/SiteSeoSettings';
import SocialSharingSettings from '../../data/settings/SocialSharingSettings';
import SiteMetadata from '../../data/SiteMetadata';
import useMailingList from '../../hooks/useMailingList';
import renderTemplateTags from '../../util/render-template-tags';
import Layout from '../Layout';
import MailingListSignupCard from '../MailingListSignupCard';
import MailingListSignupContainer from '../MailingListSignupContainer';
import PaginationComponent from '../PaginationComponent';
import PostCard from '../PostCard';
import RecentPostsWidget from '../RecentPostsWidget';
import SEO from '../SEO';
import TopBar from '../TopBar';

const ALL_POSTS_GLOB = '*';

export interface MDXPostListPageTemplateProps {
  pageContext: any;
  data: any;
}

export default function MDXPostListPageTemplate(props: MDXPostListPageTemplateProps): JSX.Element {
  // Data
  const data = props.data;
  const allMdx = data.allMdx;
  const siteMetadata = new SiteMetadata(data.site.siteMetadata);
  const builtInPagesSettings = new BuiltInPagesSettings(data.builtInPagesYaml);
  const siteSeoSettings = new SiteSeoSettings(data.seoYaml);
  const mailingListSettings = new MailingListSettings(data.mailingListYaml);
  const discussionSettings = new DiscussionSettings(data.discussionYaml);
  const postSettings = new PostSettings(data.postYaml);
  const socialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  const allPostsListSlug = postSettings.data.allPostsListSlug;
  const postCategoryListSlug = postSettings.data.postCategoryListSlug;

  // Page context variables
  const pageContext = props.pageContext;
  const numPages = pageContext.numPages;
  const currentPage = pageContext.currentPage;
  const categorySlugGlob = pageContext.categorySlugGlob;
  const categoryName = pageContext.categoryName;

  const mailingList = useMailingList(
    mailingListSettings.data.mailingListFormActionUrl,
    mailingListSettings.data.mailingListAsyncEnabled,
    mailingListSettings.asyncFetchInitOptions
  );

  const showSidebar: boolean = builtInPagesSettings.data.categoryPostListingPageSettings.showSidebar;

  const posts: MdxContent[] = allMdx.nodes
    .map(node => new MdxContent(node))
    .filter((post: MdxContent) => !post.data.frontmatter.hidden);

  const postElements: JSX.Element[] = posts.map((post: MdxContent, index) => {
    return (
      <PostCard
        key={'post-card-' + index}
        post={post}
        postCategoryListSlug={postCategoryListSlug}
        showCommentCount={discussionSettings.data.siteWideCommentsEnabled}
      />
    );
  });

  const postsHrefPrefix: string =
    categorySlugGlob === ALL_POSTS_GLOB ? `/${allPostsListSlug}` : `/${postCategoryListSlug}/${categorySlugGlob}`;

  let previousPageLink: string | undefined = undefined;
  if (currentPage > 1) {
    previousPageLink = postsHrefPrefix + '/' + (currentPage > 2 ? currentPage - 1 + '/' : '');
  }

  let nextPageLink: string | undefined = undefined;
  if (currentPage < numPages) {
    nextPageLink = postsHrefPrefix + '/' + (currentPage + 1) + '/';
  }

  const hasPagination: boolean = !!previousPageLink || !!nextPageLink;

  const paginationComponent: JSX.Element = (
    <PaginationComponent
      nextPageLink={nextPageLink}
      previousPageLink={previousPageLink}
      currentPage={currentPage}
      numPages={numPages}
    />
  );

  // === SEO === === === === === === === ===

  const templateTags = {
    ...siteMetadata.getTemplateTags(),
    ...socialSharingSettings.getTemplateTags(),
    ...siteSeoSettings.getSiteWideTemplateTags(),
    ...siteSeoSettings.getCategoryPostListingSeoTempateTags(),
    ...builtInPagesSettings.getCategoryPostListingTemplateTags(),
    contentExcerpt: siteSeoSettings.data.categoryPostListingPageSettings.seoDescription,
    contentCategory: categoryName,
  };

  const lang = siteMetadata.data.siteLanguage;

  const contentTitle = renderTemplateTags(
    builtInPagesSettings.data.categoryPostListingPageSettings.contentTitle,
    templateTags
  );
  const seoTitle = renderTemplateTags(siteSeoSettings.data.categoryPostListingPageSettings.seoTitle, templateTags);
  const seoDescription = renderTemplateTags(
    siteSeoSettings.data.categoryPostListingPageSettings.seoDescription,
    templateTags
  );
  let seoImageUrl = siteMetadata.data.siteImage;
  let seoImageAlt = siteMetadata.data.siteImageAlt;
  if (siteSeoSettings.data.categoryPostListingPageSettings.seoImage.useSiteImage) {
    seoImageUrl = siteMetadata.data.siteImage;
    seoImageAlt =
      siteMetadata.data.siteImageAlt !== 'none'
        ? renderTemplateTags(siteMetadata.data.siteImageAlt, templateTags)
        : undefined;
  } else {
    seoImageUrl = siteSeoSettings.data.categoryPostListingPageSettings.seoImage.customSeoImage;
    seoImageAlt =
      siteSeoSettings.data.categoryPostListingPageSettings.seoImage.customSeoImageAlt !== 'none'
        ? renderTemplateTags(
            siteSeoSettings.data.categoryPostListingPageSettings.seoImage.customSeoImageAlt,
            templateTags
          )
        : undefined;
  }
  const ogTitle = renderTemplateTags(
    siteSeoSettings.data.categoryPostListingPageSettings.openGraph.ogTitle,
    templateTags
  );
  const ogDescription = renderTemplateTags(
    siteSeoSettings.data.categoryPostListingPageSettings.openGraph.ogDescription,
    templateTags
  );
  let ogImageUrl = seoImageUrl;
  let ogImageAlt = seoImageAlt;
  if (siteSeoSettings.data.categoryPostListingPageSettings.openGraph.ogImage.ogUseCustomOgImage) {
    ogImageUrl = siteSeoSettings.data.categoryPostListingPageSettings.openGraph.ogImage.ogCustomImage;
    ogImageAlt =
      siteSeoSettings.data.categoryPostListingPageSettings.openGraph.ogImage.ogCustomImageAlt !== 'none'
        ? renderTemplateTags(
            siteSeoSettings.data.categoryPostListingPageSettings.openGraph.ogImage.ogCustomImageAlt,
            templateTags
          )
        : undefined;
  }
  let twitterSiteUsername =
    siteSeoSettings.data.categoryPostListingPageSettings.twitterCards.twitterCardSiteUsername !== 'none'
      ? renderTemplateTags(
          siteSeoSettings.data.categoryPostListingPageSettings.twitterCards.twitterCardSiteUsername,
          templateTags
        )
      : undefined;
  // If it was replaced with the site username which is none, set it to undefined.
  twitterSiteUsername = twitterSiteUsername !== 'none' ? twitterSiteUsername : undefined;
  const twitterCardTitle = renderTemplateTags(
    siteSeoSettings.data.categoryPostListingPageSettings.twitterCards.twitterCardTitle,
    templateTags
  );
  const twitterCardDescription = renderTemplateTags(
    siteSeoSettings.data.categoryPostListingPageSettings.twitterCards.twitterCardDescription,
    templateTags
  );
  let twitterCardImageUrl = seoImageUrl;
  let twitterCardImageAlt = seoImageAlt;
  if (siteSeoSettings.data.categoryPostListingPageSettings.twitterCards.twitterCardImage.twitterCardUseCustomImage) {
    twitterCardImageUrl =
      siteSeoSettings.data.categoryPostListingPageSettings.twitterCards.twitterCardImage.twitterCardCustomImage;
    twitterCardImageAlt =
      siteSeoSettings.data.categoryPostListingPageSettings.twitterCards.twitterCardImage.twitterCardCustomImageAlt !==
      'none'
        ? renderTemplateTags(
            siteSeoSettings.data.categoryPostListingPageSettings.twitterCards.twitterCardImage
              .twitterCardCustomImageAlt,
            templateTags
          )
        : undefined;
  }
  const twitterUseLargeImage: boolean =
    siteSeoSettings.data.categoryPostListingPageSettings.twitterCards.twitterCardType ===
    'summary-card-with-large-image';

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
      <TopBar />
      <Container className="mt-4 mb-4 pt-3">
        <Row>
          <Col md={{ span: 8, offset: showSidebar ? 0 : 2 }}>
            <Card className="mb-4 secondary">
              <Card.Header>
                <h1>{contentTitle}</h1>
              </Card.Header>
            </Card>
            {hasPagination && currentPage > 1 && paginationComponent}
            {postElements}
            {hasPagination && paginationComponent}
          </Col>
          {showSidebar && (
            <Col md={{ span: 4 }}>
              <div className="d-none d-md-block mb-4">
                <MailingListSignupCard mailingList={mailingList} />
              </div>
              <div className="mb-4">
                <RecentPostsWidget />
              </div>
            </Col>
          )}
        </Row>
      </Container>
      <MailingListSignupContainer mailingList={mailingList} />
    </Layout>
  );
}

// Page query is located in js/MDXPostListPage.js
