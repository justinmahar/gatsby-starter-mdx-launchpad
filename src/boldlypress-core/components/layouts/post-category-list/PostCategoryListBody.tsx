import { Link } from 'gatsby';
import * as React from 'react';
import { LayoutProps } from '../../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import MdxContent from '../../../../../plugins/boldlypress-core/src/data/MdxContent';

const ALL_POSTS_GLOB = '*';

export default function PostCategoryListBody(props: LayoutProps): JSX.Element {
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
      <div key={'post-' + index}>
        <Link to={`/${post.data.fields.slug}`}>{post.data.frontmatter.title}</Link>
      </div>
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

  const newerPostsButton: JSX.Element = (
    <Link to={previousPageLink} className={!previousPageLink ? 'invisible' : undefined}>
      &larr; Newer Posts
    </Link>
  );
  const olderPostsButton: JSX.Element = (
    <Link to={nextPageLink} className={!nextPageLink ? 'invisible' : undefined}>
      Older Posts &rarr;
    </Link>
  );

  const paginationComponent: JSX.Element = (
    <div className="d-flex justify-content-between align-items-center my-4">
      <div>
        {!!previousPageLink && <Link to={previousPageLink}>{newerPostsButton}</Link>}
        {!previousPageLink && newerPostsButton}
      </div>
      <div>
        Page {currentPage}/{numPages}
      </div>
      <div>
        {!!nextPageLink && <Link to={nextPageLink}>{olderPostsButton}</Link>}
        {!nextPageLink && olderPostsButton}
      </div>
    </div>
  );

  const templateTags = mdxContent.getTemplateTags(props.settings, { contentCategory: categoryName });
  const contentTitle = templateTags.render(mdxContent.data.frontmatter.title);

  return (
    <div>
      <h1>{contentTitle}</h1>
      <div>
        {hasPagination && currentPage > 1 && paginationComponent}
        {postElements}
        {hasPagination && paginationComponent}
      </div>
    </div>
  );
}
