import * as React from 'react';
import { LayoutProps } from '../../../plugins/boldlypress-core/src/components/layouts/getLayout';

export interface BodyProps {
  children?: React.ReactNode;
}
export default function Body(props: LayoutProps & BodyProps): JSX.Element {
  return <div style={{ paddingTop: '6em', paddingBottom: '8em' }}>{props.children}</div>;
}
