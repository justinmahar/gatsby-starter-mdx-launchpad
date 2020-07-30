import { Layouts } from '../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import ContentLayout from './content/ContentLayout';
import IndexLayout from './index/IndexLayout';
import PostCategoryListLayout from './post-category-list/PostCategoryListLayout';
import NotFoundLayout from './not-found/NotFoundLayout';

// These layouts will be available by keyname via the layout option in all MDX pages.
const layouts: Layouts = {
  content: ContentLayout,
  index: IndexLayout,
  'not-found': NotFoundLayout,
};

export default layouts;

// Be sure to update the boldlypress-core layoutOptions.js (shadowed) to make these selectable via the CMS
