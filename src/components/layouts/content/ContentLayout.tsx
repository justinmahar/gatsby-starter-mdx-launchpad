import * as React from 'react';
import ContentBody from './ContentBody';
import Footer from '../Footer';
import Header from '../Header';
import MdxSEO from '../../../../plugins/boldlypress-core/src/components/MdxSEO';
import { LayoutProps } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';

export default function ContentLayout(props: LayoutProps): JSX.Element {
  return (
    <>
      <MdxSEO {...props} />
      <Header {...props} />
      <ContentBody {...props} />
      <Footer {...props} />
    </>
  );
}
