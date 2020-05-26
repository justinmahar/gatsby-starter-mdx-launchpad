import * as React from 'react';
import { LayoutProps } from '../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import MdxSEO from '../../../plugins/boldlypress-core/src/components/MdxSEO';

export default function Head(props: LayoutProps): JSX.Element {
  return (
    <>
      <MdxSEO {...props} />
    </>
  );
}
