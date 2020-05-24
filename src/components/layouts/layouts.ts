import { Layouts } from '../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import ContentLayout from './content/ContentLayout';
import AppLayout from './index/IndexLayout';
import PostCategoryListLayout from './post-category-list/PostCategoryListLayout';
import NotFoundLayout from './not-found/NotFoundLayout';

const layouts: Layouts = {
  content: ContentLayout,
  app: AppLayout,
  'post-category-list': PostCategoryListLayout,
  'not-found': NotFoundLayout,
};

export default layouts;

// Be sure to update the boldlypress-code shadowed layoutOptions.js
