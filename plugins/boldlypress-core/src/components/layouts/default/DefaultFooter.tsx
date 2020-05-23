import * as React from 'react';
import SiteName from '../../configured/SiteName';
import { LayoutProps } from '../getLayout';

export default function DefaultFooter(props: LayoutProps): JSX.Element {
  return (
    <div>
      Copyright &copy; {new Date().getFullYear()}, <SiteName />. All rights reserved.
    </div>
  );
}
