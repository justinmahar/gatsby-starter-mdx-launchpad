import React from 'react';

export interface BodyProps {
  children?: React.ReactNode;
}
export default function Body(props: BodyProps): JSX.Element {
  return <div style={{ paddingTop: '4em', paddingBottom: '6em' }}>{props.children}</div>;
}
