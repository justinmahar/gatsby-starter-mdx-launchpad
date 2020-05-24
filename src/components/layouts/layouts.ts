import AppLayout from './app/AppLayout';
import ContentLayout from './content/ContentLayout';
import PostCategoryListLayout from './post-category-list/PostCategoryListLayout';
import NotFoundLayout from './not-found/NotFoundLayout';
import { Layouts } from '../../../plugins/boldlypress-core/src/components/layouts/getLayout';

const layouts: Layouts = {
  content: ContentLayout,
  app: AppLayout,
  'post-category-list': PostCategoryListLayout,
  'not-found': NotFoundLayout,
};

export default layouts;

// These will be exposed to the CMS (via layoutOptions.js)
// The values should match the keys defined above.
export const layoutOptions = [
  { value: 'content', label: 'Content (Pages & Posts)' },
  { value: 'app', label: 'App' },
  { value: 'post-category-list', label: 'Post Category List' },
  { value: 'not-found', label: 'Not Found' },
];
