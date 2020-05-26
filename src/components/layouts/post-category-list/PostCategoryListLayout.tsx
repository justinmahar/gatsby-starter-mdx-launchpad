import * as React from 'react';
import { LayoutProps } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import DefaultWrapper from '../DefaultWrapper';
import PostCategoryListBody from './PostCategoryListBody';

export default function PostCategoryListLayout(props: LayoutProps): JSX.Element {
  return (
    <DefaultWrapper {...props}>
      <PostCategoryListBody {...props} />
    </DefaultWrapper>
  );
}
