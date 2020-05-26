import * as React from 'react';
import Head from './Head';
import Header from './Header';
import Footer from './Footer';
import { LayoutProps } from '../../../plugins/boldlypress-core/src/components/layouts/getLayout';

export interface DefaultWrapperProps {
  children?: React.ReactNode;
}

export default function DefaultWrapper(props: LayoutProps & DefaultWrapperProps): JSX.Element {
  return (
    <>
      <Head {...props} />
      <Header {...props} />
      {props.children}
      <Footer {...props} />
    </>
  );
}
