import * as React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { LayoutProps } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import PostCategoryListBody from './PostCategoryListBody';
import MdxSEO from '../../../../plugins/boldlypress-core/src/components/MdxSEO';

export default function PostCategoryListLayout(props: LayoutProps): JSX.Element {
  return (
    <>
      <MdxSEO {...props} />
      <Header {...props} />
      <PostCategoryListBody {...props} />
      <Footer {...props} />
    </>
  );
}
