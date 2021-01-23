import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Layout from '../components/layouts/Layout';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  return (
    <Layout {...props}>
      <Body {...props}>
        <Container className="content">
          <Row>
            <Col>
              <p>Index content.</p>
            </Col>
          </Row>
        </Container>
      </Body>
    </Layout>
  );
}

// Page query goes here
