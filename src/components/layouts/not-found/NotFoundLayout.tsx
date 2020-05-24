import * as React from 'react';
import { LayoutProps } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import MdxSEO from '../../../../plugins/boldlypress-core/src/components/MdxSEO';
import Footer from '../Footer';
import Header from '../Header';
import NotFoundBody from './NotFoundBody';

export default function NotFoundLayout(props: LayoutProps): JSX.Element {
  return (
    <>
      <MdxSEO {...props} />
      <Header {...props} />
      <NotFoundBody {...props} />
      <Footer {...props} />
    </>
  );
}
