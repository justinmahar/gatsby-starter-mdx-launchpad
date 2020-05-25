import * as React from 'react';
import { LayoutProps } from '../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import { Link } from 'gatsby';

export default function Header(props: LayoutProps): JSX.Element {
  return (
    <div>
      <div>
        <strong>{props.settings.data.site.siteMetadata.siteName}</strong>
      </div>
      <div>
        <Link to="/">Home</Link> | <Link to="/posts">Blog</Link> | <Link to="/about">About</Link> |{' '}
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}
