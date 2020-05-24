import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import * as React from 'react';
import { LayoutProps } from '../../../../../plugins/boldlypress-core/src/components/layouts/getLayout';

export default function ContentBody(props: LayoutProps): JSX.Element {
  const contentTitle = props.templateTags.render(props.mdxContent.data.frontmatter.title);
  return (
    <div>
      <h1>{contentTitle}</h1>
      <MDXRenderer scope={undefined} components={undefined}>
        {props.mdxContent.data.body}
      </MDXRenderer>
    </div>
  );
}
