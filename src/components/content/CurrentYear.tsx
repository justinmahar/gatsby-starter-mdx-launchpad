import React from 'react';

export default function CurrentYear(): JSX.Element {
  return <>{new Date().getFullYear()}</>;
}
