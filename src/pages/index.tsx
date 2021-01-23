import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ErrorBoundary } from '../components/ErrorBoundary2';
import Body from '../components/layouts/Body';
import Layout from '../components/layouts/Layout';
import SEO from '../components/layouts/SEO';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  return (
    <Layout {...props}>
      <SEO seo={{ title: '{siteName}{seoTitleSeparator}{siteDescription}' }} />
      <Body {...props}>
        <Container className="content">
          <Row>
            <Col>
              <ErrorBoundary>
                <MDXRenderer scope={undefined} components={undefined}>
                  {props.data.contentExample.body}
                </MDXRenderer>
              </ErrorBoundary>
            </Col>
          </Row>
        </Container>
      </Body>
    </Layout>
  );
}

// Page query goes here
export const query = graphql`
  query IndexPageQuery {
    contentExample: mdx(fields: { slug: { eq: "content-example2" } }) {
      ...mdxContent
    }
  }
`;
