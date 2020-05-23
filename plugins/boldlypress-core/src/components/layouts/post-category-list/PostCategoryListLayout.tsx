import * as React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import MdxContent from '../../../data/MdxContent';
import MdxSEO from '../../configured/MdxSEO';
import PaginationComponent from '../../PaginationComponent';
import PostCard from '../../PostCard';
import DefaultFooter from '../default/DefaultFooter';
import DefaultHeader from '../default/DefaultHeader';
import DefaultPostFooter from '../default/DefaultPostFooter';
import DefaultPostHeader from '../default/DefaultPostHeader';
import DefaultPreFooter from '../default/DefaultPreFooter';
import DefaultPreHeader from '../default/DefaultPreHeader';
import { LayoutProps } from '../getLayout';
import { TemplateTags } from '../../../data/TemplateTags';

const ALL_POSTS_GLOB = '*';

export default function PostCategoryListLayout(props: LayoutProps): JSX.Element {
  const postSettings = props.settings.data.postYaml;
  const allPostsListSlug = postSettings.allPostsListSlug;
  const postCategoryListSlug = postSettings.postCategoryListSlug;

  // Page context variables
  const pageContext = props.pageContext;
  const numPages = pageContext.numPages;
  const currentPage = pageContext.currentPage;
  const categorySlugGlob = pageContext.categorySlugGlob;
  const categoryName = pageContext.categoryName;

  const mdxContent: MdxContent = props.mdxContent;

  const mdxPosts = props.pageQueryData.mdxPosts ? props.pageQueryData.mdxPosts : [];
  const posts: MdxContent[] = mdxPosts.nodes
    .map((node) => new MdxContent(node))
    .filter((post: MdxContent) => !post.data.frontmatter.options.hidden);

  const postElements: JSX.Element[] = posts.map((post: MdxContent, index) => {
    return (
      <PostCard
        key={'post-card-' + index}
        post={post}
        postCategoryListSlug={postCategoryListSlug}
        showCommentCount={props.settings.data.discussionYaml.siteWideCommentsEnabled}
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

  const templateTags: TemplateTags = mdxContent.getTemplateTags(props.settings, { contentCategory: categoryName });
  const contentTitle = templateTags.render(mdxContent.data.frontmatter.title);

  return (
    <>
      <MdxSEO {...props} />
      <DefaultPreHeader {...props} />
      <DefaultHeader {...props} />
      <DefaultPostHeader {...props} />
      <Container className="mt-4 mb-4 pt-3">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="mb-4 secondary">
              <Card.Header>
                <h1>{contentTitle}</h1>
              </Card.Header>
            </Card>
            {hasPagination && currentPage > 1 && paginationComponent}
            {postElements}
            {hasPagination && paginationComponent}
          </Col>
        </Row>
      </Container>
      <DefaultPreFooter {...props} />
      <DefaultFooter {...props} />
      <DefaultPostFooter {...props} />
    </>
  );
}
