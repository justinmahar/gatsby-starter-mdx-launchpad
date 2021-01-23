import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Layout from '../components/layouts/Layout';
import Head from '../components/layouts/Head';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  return (
    <Layout>
      <Head seo={{ title: `{siteName}{seoTitleSeparator}{siteDescription}` }} />
      <Body>
        <Container className="content">
          <Row>
            <Col>
              <h1>Home</h1>
              <p>This is the index. Build something awesome.</p>
            </Col>
          </Row>
        </Container>
      </Body>
    </Layout>
  );
}
