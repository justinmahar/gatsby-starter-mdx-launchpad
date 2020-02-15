import ContentLayout from './impl/ContentLayout';
import BlogIndexLayout from './impl/BlogIndexLayout';
import PostListPageLayout from './impl/PostListPageLayout';

const coreLayouts = {
  content: ContentLayout,
  'blog-index': BlogIndexLayout,
  'category-post-list': PostListPageLayout,
};

export default coreLayouts;
