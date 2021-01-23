import * as React from 'react';

export interface BodyProps {
  children?: React.ReactNode;
}
export default function Body(props: BodyProps): JSX.Element {
  return <div style={{ paddingTop: '6em', paddingBottom: '8em' }}>{props.children}</div>;
}
