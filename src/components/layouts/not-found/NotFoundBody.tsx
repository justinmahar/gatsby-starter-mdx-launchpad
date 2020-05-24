import * as React from 'react';
import { LayoutProps } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import { Link } from 'gatsby';

export default function NotFoundBody(props: LayoutProps): JSX.Element {
  return (
    <div className="text-center">
      <h1>Well, shoot.</h1>
      <br />
      <h5>We couldn't find what you were looking for.</h5>
      <br />
      <Link to="/">&laquo; Home</Link>
    </div>
  );
}
