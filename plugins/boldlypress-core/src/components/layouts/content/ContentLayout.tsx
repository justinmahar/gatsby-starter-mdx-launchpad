import * as React from 'react';
import MdxSEO from '../../configured/MdxSEO';
import { LayoutProps } from '../getLayout';
import ContentBody from './ContentBody';
import ContentFooter from './ContentFooter';
import ContentHeader from './ContentHeader';
import ContentPostFooter from './ContentPostFooter';
import ContentPostHeader from './ContentPostHeader';
import ContentPreFooter from './ContentPreFooter';
import ContentPreHeader from './ContentPreHeader';

export default function ContentLayout(props: LayoutProps): JSX.Element {
  return (
    <>
      <MdxSEO {...props} />
      <ContentPreHeader {...props} />
      <ContentHeader {...props} />
      <ContentPostHeader {...props} />
      <ContentBody {...props} />
      <ContentPreFooter {...props} />
      <ContentFooter {...props} />
      <ContentPostFooter {...props} />
    </>
  );
}
