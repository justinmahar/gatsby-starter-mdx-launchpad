import * as React from 'react'

export interface CurrentYearProps {}

export default function CurrentYear(props: CurrentYearProps): JSX.Element {
  return <>{new Date().getFullYear()}</>
}
