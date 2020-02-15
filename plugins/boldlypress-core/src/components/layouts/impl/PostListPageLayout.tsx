import * as React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import MdxContent from '../../../data/MdxContent';
import BuiltInPagesSettings from '../../../data/settings/BuiltInPagesSettings';
import DiscussionSettings from '../../../data/settings/DiscussionSettings';
import MailingListSettings from '../../../data/settings/MailingListSettings';
import PostSettings from '../../../data/settings/PostSettings';
import SiteSeoSettings from '../../../data/settings/SiteSeoSettings';
import SocialSharingSettings from '../../../data/settings/SocialSharingSettings';
import SiteMetadata from '../../../data/SiteMetadata';
import useMailingList from '../../../hooks/useMailingList';
import renderTemplateTags from '../../../util/render-template-tags';
import MdxSEO from '../../configured/MdxSEO';
import MailingListSignupCard from '../../MailingListSignupCard';
import MailingListSignupContainer from '../../MailingListSignupContainer';
import PaginationComponent from '../../PaginationComponent';
import PostCard from '../../PostCard';
import RecentPostsWidget from '../../RecentPostsWidget';
import TopBar from '../../TopBar';
import Wrapper from '../../Wrapper';
import { LayoutProps } from '../getLayout';
import Footer from '../../Footer';
import { useStaticQuery, graphql } from 'gatsby';

const ALL_POSTS_GLOB = '*';

export default function PostListPageLayout(props: LayoutProps): JSX.Element {
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

  const allMdx = data.allMdx;
  const siteMetadata = new SiteMetadata(data.site.siteMetadata);
  const siteSeoSettings = new SiteSeoSettings(data.seoYaml);
  const mailingListSettings = new MailingListSettings(data.mailingListYaml);
  const postSettings = new PostSettings(data.postYaml);
  const discussionSettings = new DiscussionSettings(data.discussionYaml);
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

  const mdxContent: MdxContent = new MdxContent(props.mdx);

  const showSidebar: boolean = mdxContent.data.frontmatter.options.showSidebar;

  const posts: MdxContent[] = allMdx.nodes
    .map(node => new MdxContent(node))
    .filter((post: MdxContent) => !post.data.frontmatter.options.hidden);

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

  const templateTags = {
    ...siteMetadata.getTemplateTags(),
    ...socialSharingSettings.getTemplateTags(),
    ...siteSeoSettings.getTemplateTagsFor(mdxContent.data.frontmatter.seoSettings.seoConfigurationId),
    ...mdxContent.getTemplateTags(),
    contentCategory: categoryName,
  };

  const contentTitle = renderTemplateTags(mdxContent.data.frontmatter.title, templateTags);

  return (
    <Wrapper>
      <MdxSEO mdxContent={mdxContent} templateTags={templateTags} />
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
      <Footer />
    </Wrapper>
  );
}
