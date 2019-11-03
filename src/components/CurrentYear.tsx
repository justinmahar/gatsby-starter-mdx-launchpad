import * as React from 'react';

export interface ICurrentYearProps {
}

export default function CurrentYear (props: ICurrentYearProps) {
  return (
    <>
      {new Date().getFullYear()}
    </>
  );
}
