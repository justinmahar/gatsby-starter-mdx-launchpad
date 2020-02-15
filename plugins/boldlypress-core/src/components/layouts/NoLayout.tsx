import * as React from 'react';
import { LayoutProps } from './getLayout';

export default function NoLayout(props: LayoutProps): JSX.Element {
  return <div>Layout was not found. Check the console.</div>;
}
