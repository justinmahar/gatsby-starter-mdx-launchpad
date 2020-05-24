import AppLayout from './app/AppLayout';
import ContentLayout from './content/ContentLayout';
import PostCategoryListLayout from './post-category-list/PostCategoryListLayout';
import NotFoundLayout from './not-found/NotFoundLayout';
import { Layouts } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';

const layouts: Layouts = {
  content: ContentLayout,
  app: AppLayout,
  'post-category-list': PostCategoryListLayout,
  'not-found': NotFoundLayout,
};

export default layouts;

// Be sure to update admin/collections/mdx/layoutOptions.js
