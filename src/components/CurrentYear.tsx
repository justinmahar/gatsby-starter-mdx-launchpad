import * as React from 'react';

export default function CurrentYear(props: {}): JSX.Element {
  return <>{new Date().getFullYear()}</>;
}
