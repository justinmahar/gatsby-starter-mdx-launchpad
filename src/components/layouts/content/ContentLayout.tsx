import { MDXRenderer } from 'gatsby-plugin-mdx';
import * as React from 'react';
import { Container } from 'reactstrap';
import { LayoutProps } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import Body from '../Body';
import DefaultWrapper from '../DefaultWrapper';

export default function ContentLayout(props: LayoutProps): JSX.Element {
  const contentTitle = props.templateTags.render(props.mdxContent.data.frontmatter.title);
  return (
    <DefaultWrapper {...props}>
      <Body {...props}>
        <Container className="content">
          <h1>{contentTitle}</h1>
          <MDXRenderer scope={undefined} components={undefined}>
            {props.mdxContent.data.body}
          </MDXRenderer>
        </Container>
      </Body>
    </DefaultWrapper>
  );
}
