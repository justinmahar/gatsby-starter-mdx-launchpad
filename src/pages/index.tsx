import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Head from '../components/layouts/Head';
import Layout from '../components/layouts/Layout';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  const pageTitle = `{siteName}`;
  const description = `{siteDescription}`;

  const seoTitle = `${pageTitle}`;

  return (
    <Layout>
      <Head seo={{ title: seoTitle, description: description }} />
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
