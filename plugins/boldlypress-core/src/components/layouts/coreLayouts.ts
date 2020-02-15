import PagePostLayout from './impl/PageLayout';
import BlogIndexLayout from './impl/BlogIndexLayout';
import PostListPageLayout from './impl/PostListPageLayout';

const coreLayouts = {
  'page-post': PagePostLayout,
  'blog-index': BlogIndexLayout,
  'category-post-listing': PostListPageLayout,
};

export default coreLayouts;
