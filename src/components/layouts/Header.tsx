import { Link } from 'gatsby';
import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { LayoutProps } from '../../../plugins/boldlypress-core/src/components/layouts/getLayout';

export default function Header(props: LayoutProps): JSX.Element {
  return (
    <Container>
      <Row>
        <Col>
          <div>
            <div>
              <strong>{props.settings.data.site.siteMetadata.siteName}</strong>
            </div>
            <div>
              <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
